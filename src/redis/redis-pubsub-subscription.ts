import {
  createContextualLogger,
  errorFromUnknown,
  ILogger,
  IPubSubSubscriberService,
  isInteger,
  isString,
  once,
  sleep,
} from '../core';

/**
 * This class represents a Redis pub/sub subscription handler. It manages subscribing,
 * unsubscribing, and handling messages from a specific Redis channel. The class ensures
 * resilience by implementing automatic resubscription in case of connection issues.
 */
export class RedisPubsubSubscription {
  private readonly callback: (error: Error | null | undefined, message: unknown) => void;
  private readonly onMessage: (channel: string, message: string) => void;
  private readonly onConnected: () => void;

  /**
   * Constructor for creating an instance of a subscription handler.
   *
   * @param {ILogger} loggerBase - A logger instance used for logging errors and events.
   * @param {IPubSubSubscriberService} subscriber - An instance of a pub/sub subscriber service.
   * @param {string} channel - The channel name to subscribe to for receiving messages.
   * @param {Object} handlers - Object containing callback functions for various subscription events.
   * @param {() => void} [handlers.onSubscribed] - Callback invoked when successfully subscribed to the channel.
   * @param {(message: string) => void} handlers.onMessage - Callback invoked when a message is received as a string.
   * @param {(buffer: Buffer) => void} [handlers.onBuffer] - Callback invoked when a message is received as a buffer.
   * @param {(error: Error, message: unknown) => void} [handlers.onError] - Callback invoked on errors in message handling or subscription process.
   */
  constructor(
    private readonly loggerBase: ILogger,
    private readonly subscriber: IPubSubSubscriberService,
    private readonly channel: string,
    handlers: {
      onSubscribed?: () => void;
      onMessage: (message: string) => void;
      onBuffer?: (buffer: Buffer) => void;
      /**
       * A callback to be executed when the Redis client successfully connects or reconnects.
       * Currently, the onError will be called only at the failed start of subscription, and with null message.
       * @param error
       * @param message
       */
      onError?: (error: Error, message: unknown) => void;
    }
  ) {
    this.onConnected = handlers.onSubscribed ?? (() => {});

    const onError = (error: Error, message: unknown) => {
      if (handlers.onError) {
        handlers.onError(error, message);
      } else {
        this.logger.error({ error, message }, 'Unhandled Redis subscription error (onError is not defined)');
      }
    };

    this.callback = (error, message) => {
      // console.log(`message: ${message}, error: ${error}`);
      if (error) {
        return onError(error, message);
      }

      try {
        if (Buffer.isBuffer(message)) {
          if (handlers.onBuffer) {
            return handlers.onBuffer(message);
          }
          return handlers.onMessage(message.toString());
        }
        if (isString(message)) {
          return handlers.onMessage(message);
        }

        if (!isInteger(message)) {
          this.logger.warn({ message }, `Unknown message type has come to subscription`);
        }
        return undefined; // do nothing
      } catch (error) {
        return onError(errorFromUnknown(error), message);
      }
    };

    this.onMessage = (channel, message) => {
      if (channel === this.channel) {
        this.callback(null, message);
      }
    };
  }

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, RedisPubsubSubscription.name, { channel: this.channel });
  }

  private active = false;
  private subscribing: Promise<void> | null = null;

  private subscribe() {
    return this.subscriber.subscribe(this.channel, this.callback);
  }

  private unsubscribe() {
    return this.subscriber.unsubscribe(this.channel, this.callback);
  }

  private readonly resubscribe = (): Promise<void> => {
    if (this.subscribing) {
      return this.subscribing;
    }

    if (!this.active) {
      return Promise.resolve();
    }

    const safeOnConnected = async () => {
      try {
        this.onConnected();
      } catch (error) {
        await this.unsubscribe();
        throw error;
      }
    };

    return (this.subscribing = (async () => {
      try {
        await this.subscribe();
        if (!this.active) {
          // after async point
          await this.unsubscribe();
          this.subscribing = null;
          return undefined;
        }

        await safeOnConnected();
        this.subscribing = null;
        return undefined;
      } catch (error) {
        this.logger.error({ error }, `Failed to subscribe to channel [${this.channel}]. Retrying in 5s...`);
        await sleep(5000);

        this.subscribing = null; // Allow the next attempt
        return this.resubscribe();
      }
    })());
  };

  /**
   * Activates the current instance by setting it to active and establishing necessary subscriptions.
   * Ensures the instance is not already active before proceeding. Upon activation, it sets up message
   * listeners and initiates an initial subscription attempt.
   *
   * @return {Promise<void>} A promise that resolves once the activation logic has completed.
   */
  async activate(): Promise<void> {
    if (this.active) {
      return;
    }

    this.active = true;
    this.subscriber.onMessage(`on`, this.onMessage).onReady(`on`, this.resubscribe);
    // Initial subscription attempt
    await this.resubscribe();
  }

  /**
   * Deactivates the current subscriber instance if it is active.
   * This method unsubscribes from the specified channel and cleans up resources.
   *
   * @return {Promise<void>} A promise that resolves when the deactivation process is complete.
   */
  async deactivate(): Promise<void> {
    if (!this.active) {
      return;
    }
    this.active = false;

    this.subscriber.onMessage(`off`, this.onMessage).onReady(`off`, this.resubscribe);

    // The `active` flag will prevent any in-progress subscription from completing or retrying.
    // We still need to ensure we unsubscribe from the channel.
    await this.subscriber.unsubscribe(this.channel, this.callback);
    this.subscribing = null;
  }
}
