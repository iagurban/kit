import { IPubSubSubscriberService } from '@gurban/kit/pubsub-subscriber-service.interface';
import { Injectable } from '@nestjs/common';
import { Callback } from 'ioredis/built/types';

import { RedisSubscriptionService } from '../nosql/redis/redis.service';

@Injectable()
export class PubSubSubscriberService implements IPubSubSubscriberService {
  constructor(private readonly redis: RedisSubscriptionService) {}

  subscribe(...args: [...channels: (string | Buffer)[], callback: Callback<unknown>]): Promise<unknown> {
    return this.redis.subscribe(...args);
  }

  unsubscribe(...args: [...channels: (string | Buffer)[], callback: Callback<unknown>]): Promise<unknown> {
    return this.redis.unsubscribe(...args);
  }

  onMessage(action: `on` | `off`, fn: (channel: string, message: string) => void): IPubSubSubscriberService {
    this.redis[action](`message`, fn);
    return this;
  }

  onReady(action: `on` | `off`, fn: () => void): IPubSubSubscriberService {
    this.redis[action](`ready`, fn);
    return this;
  }
}
