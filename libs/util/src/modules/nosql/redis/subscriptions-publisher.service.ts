import { once } from '@gurban/kit/core/once';
import { Topic } from '@gurban/kit/declare-events-topic';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Injectable } from '@nestjs/common';
import { z } from 'zod/v4';

import { Logger } from '../../logger/logger.module';
import { RedisService } from './redis.service';

@Injectable()
export class SubscriptionsPublisherService {
  constructor(
    private readonly redis: RedisService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, SubscriptionsPublisherService.name);
  }

  async publish<S extends z.ZodType, T extends Topic<S, string>>(
    topic: T,
    payload: unknown
  ): Promise<number> {
    try {
      const validatedPayload = topic.schema.parse(payload);
      return this.redis.publish(topic.name, JSON.stringify(validatedPayload));
    } catch (error) {
      this.logger.error({ error, payload }, `Failed to publish event to channel [${topic.name}]`);
      throw error;
    }
  }
}
