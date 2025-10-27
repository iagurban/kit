import { Redis } from 'ioredis';

import { ExMap } from './collections/ex-map';

type Subscription = (message: string) => void;

export class RedisSubscriber {
  constructor(private readonly redis: Redis) {}

  readonly subscriptions = new ExMap<string, Set<Subscription>>();

  private isAnybodySubscribed() {
    for (const set of this.subscriptions.values()) {
      if (set.size > 0) {
        return true;
      }
    }
    return false;
  }

  private readonly onMessage = (channel: string, message: string) => {
    this.subscriptions.get(channel)?.forEach(c => c(message));
  };

  async subscribe(channel: string, callback: () => unknown) {
    const wasAnybodySubscribed = this.isAnybodySubscribed();
    const subscriptionsBefore = this.subscriptions.size;
    this.subscriptions.update(channel, o => (o || new Set()).add(callback));
    if (!wasAnybodySubscribed) {
      this.redis.on(`message`, this.onMessage);
    }
    if (this.subscriptions.size > subscriptionsBefore) {
      await this.redis.subscribe(channel);
    }

    return async () => {
      const set = this.subscriptions.get(channel);
      let needUnsubscribe = false;
      if (set) {
        set.delete(callback);
        if (set.size === 0) {
          this.subscriptions.delete(channel);
          needUnsubscribe = true;
        }
      }
      if (!this.isAnybodySubscribed()) {
        this.redis.off(`message`, this.onMessage);
      }
      if (needUnsubscribe) {
        await this.redis.unsubscribe(channel);
      }
    };
  }
}
