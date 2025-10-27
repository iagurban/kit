import Redis from 'ioredis';

import { isInteger, isString } from './core/checks';
import { once } from './core/once';
import { createContextualLogger, ILogger } from './interfaces/logger-interface';
import { sleep } from './utils/async-utils';

export class RedisPubsubSubscription {
  private readonly callback: (error: Error | null | undefined, message: unknown) => void;
  private readonly onMessage: (channel: string, message: string) => void;
  private readonly onConnected: () => void;

  constructor(
    private readonly loggerBase: ILogger,
    private readonly redisSubscriptionService: Redis,
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
        return onError(error instanceof Error ? error : new Error(String(error)), message);
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
    return this.redisSubscriptionService.subscribe(this.channel, this.callback);
  }

  private unsubscribe() {
    return this.redisSubscriptionService.unsubscribe(this.channel, this.callback);
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
        if (!this.active) {
          // after async point
          this.subscribing = null;
          return undefined;
        }

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

  async activate() {
    if (this.active) {
      return;
    }

    this.active = true;
    this.redisSubscriptionService.on(`message`, this.onMessage);
    this.redisSubscriptionService.on('ready', this.resubscribe);
    // Initial subscription attempt
    await this.resubscribe();
  }

  async deactivate() {
    if (!this.active) {
      return;
    }
    this.active = false;

    this.redisSubscriptionService.off(`message`, this.onMessage);
    this.redisSubscriptionService.off('ready', this.resubscribe);

    await this.subscribing;
    await this.redisSubscriptionService.unsubscribe(this.channel, this.callback);
    this.subscribing = null;
  }
}
