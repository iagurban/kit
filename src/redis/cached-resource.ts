import { createContextualLogger, errorToString, ILogger, IPubSubSubscriberService, once } from '../core';
import { RedisPubsubSubscription } from './redis-pubsub-subscription';

/**
 * A class that manages a cached resource, providing the ability to fetch data,
 * subscribe to updates, and handle cleanup when the application shuts down.
 *
 * Synchronous subscribing, asynchronous initialization. On update the client manages
 * his fetching approach - usually he just invalidates something to a call to the fetch()
 * be performed to get a new promise for data.
 *
 * @template T The type of the resource being managed.
 */
export class CachedResource<T> {
  private dataPromise: Promise<T> | null = null;
  private subscription: RedisPubsubSubscription;
  private readonly subscribers = new Set<(self: CachedResource<T>) => void>();

  constructor(
    private readonly resourceName: string,
    private readonly fetchFn: () => Promise<T>,
    pubSubSubscriber: IPubSubSubscriberService,
    private readonly channel: string,
    private readonly loggerBase: ILogger,
    private readonly on: {
      loaded?: (data: T) => void;
    } = {}
  ) {
    this.subscription = new RedisPubsubSubscription(loggerBase, pubSubSubscriber, channel, {
      onSubscribed: () => {
        // when subscribed, invalidate cache and fetch data
        void this.fetch(true);
      },
      onMessage: () => {
        // message just notifies to invalidate cache and fetch data
        void this.fetch(true);
        for (const subscriber of this.subscribers) {
          try {
            subscriber(this);
          } catch (error) {
            this.logger.error(
              { error },
              `Unhandled error in CachedResource subscriber: ${errorToString(error)}`
            );
          }
        }
      },
    });
  }

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, CachedResource.name, {
      resourceName: this.resourceName,
      notificationChannel: this.channel,
    });
  }

  /**
   * Initializes the resource by fetching the initial data and subscribing to updates.
   * This should be called from the parent service's `onModuleInit`.
   */
  public async initialize(): Promise<void> {
    this.logger.trace(`Initializing and warming cache for resource: [${this.resourceName}]`);

    await this.subscription.activate();
    // The initial fetch will be triggered in onSubscribed
  }

  /**
   * Subscribes a callback function to be invoked on updates.
   *
   * @param {Function} onUpdate - The callback function to execute when an update occurs.
   * @return {Function} A function to unsubscribe the callback.
   */
  public subscribe(onUpdate: (self: CachedResource<T>) => void): () => void {
    this.subscribers.add(onUpdate);
    return () => {
      this.subscribers.delete(onUpdate);
    };
  }

  /**
   * Initiates a fetch operation for retrieving data, returning a cached result unless forced.
   *
   * @param {boolean} force - A flag to force fetching the data, bypassing the cache. Defaults to false.
   * @return {Promise<T>} A promise that resolves to the fetched data.
   */
  public fetch(force: boolean = false): Promise<T> {
    if (force || !this.dataPromise) {
      this.logger.trace(`Cache miss for [${this.resourceName}]. Initiating fetch.`);
      const dataPromise = this.fetchFn().then(data => {
        if (dataPromise === this.dataPromise) {
          try {
            this.on?.loaded?.(data);
          } catch (error) {
            this.logger.error(
              { error },
              `on.loaded handler thrown unhandled exception: ${errorToString(error)}`
            );
          }
        }
        return data;
      });
      this.dataPromise = dataPromise;
    }
    return this.dataPromise;
  }

  /**
   * Cleans up the subscription.
   * This should be called from the parent service's `onApplicationShutdown`.
   */
  public async destroy(): Promise<void> {
    await this.subscription.deactivate();
  }
}
