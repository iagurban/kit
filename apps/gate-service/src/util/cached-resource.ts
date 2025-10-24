import { Logger } from '@poslah/util/logger/logger.module';
import { RedisSubscriber } from '@poslah/util/redis-subscriber';

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
  private unsub: (() => Promise<void>) | null = null;
  private readonly subscribers = new Set<(self: CachedResource<T>) => void>();

  constructor(
    private readonly resourceName: string,
    private readonly fetchFn: () => Promise<T>,
    private readonly subscriber: RedisSubscriber,
    private readonly channel: string,
    private readonly logger: Logger
  ) {}

  /**
   * Initializes the resource by fetching the initial data and subscribing to updates.
   * This should be called from the parent service's `onModuleInit`.
   */
  public async initialize(): Promise<void> {
    this.logger.info(`Initializing and warming cache for resource: [${this.resourceName}]`);

    // Trigger the initial fetch
    await this.fetch();
    // Subscribe to updates
    this.unsub = await this.subscriber.subscribe(this.channel, () => {
      this.fetch(true /* invalidate */);
      for (const subscriber of this.subscribers) {
        subscriber(this);
      }
    });
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
      this.logger.info(`Cache miss for [${this.resourceName}]. Initiating fetch.`);
      this.dataPromise = this.fetchFn();
    }
    return this.dataPromise;
  }

  /**
   * Cleans up the subscription.
   * This should be called from the parent service's `onApplicationShutdown`.
   */
  public async destroy(): Promise<void> {
    if (this.unsub) {
      await this.unsub();
      this.logger.info(`Subscription cleaned up for resource: [${this.resourceName}]`);
    }
  }
}
