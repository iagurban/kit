import { isInteger, isString } from '@gurban/kit/core/checks';
import { once } from '@gurban/kit/core/once';
import { RedisSubscriptionService } from '@poslah/database/redis/redis.service';
import { createContextualLogger, Logger } from '@poslah/util/logger/logger.module';

export class RedisPubsubSubscription {
  private readonly callback: (error: Error | null | undefined, message: unknown) => void;
  private readonly onMessage: (channel: string, message: string) => void;

  constructor(
    private readonly loggerBase: Logger,
    private readonly redisSubscriptionService: RedisSubscriptionService,
    private readonly channel: string,
    handlers: {
      onMessage: (message: string) => void;
      onBuffer?: (buffer: Buffer) => void;
      /**
       * Currently onError will be called only at the failed start of subscription, and with null message.
       * @param error
       * @param message
       */
      onError?: (error: Error, message: unknown) => void;
    }
  ) {
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

  private unsub: (() => Promise<void>) | null = null;

  async activate() {
    if (this.unsub) {
      return;
    }

    this.logger.info(`Activating subscription`);

    await this.redisSubscriptionService.subscribe(this.channel, this.callback);
    this.redisSubscriptionService.on(`message`, this.onMessage);
    this.unsub = async () => {
      this.redisSubscriptionService.off(`message`, this.onMessage);
      await this.redisSubscriptionService.unsubscribe(this.channel, this.callback);
    };
  }

  async deactivate() {
    if (!this.unsub) {
      return;
    }

    this.logger.info(`Deactivating subscription`);
    await this.unsub();
    this.unsub = null;
  }
}
