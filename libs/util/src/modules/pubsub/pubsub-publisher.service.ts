import { once } from '@gurban/kit/core/once';
import { Topic } from '@gurban/kit/declare-events-topic';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Injectable } from '@nestjs/common';
import { z } from 'zod/v4';

import { Logger } from '../logger/logger.module';
import { RedisService } from '../nosql/redis/redis.service';

@Injectable()
export class PubSubPublisherService {
  constructor(
    private readonly redis: RedisService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, PubSubPublisherService.name);
  }

  async publish<S extends z.ZodType, T extends Topic<S, string>>(
    topic: T,
    payload: unknown
  ): Promise<number> {
    try {
      const validatedPayload = topic.schema.encode(payload as z.output<T[`schema`]>);
      const result = await this.redis.publish(topic.name, JSON.stringify(validatedPayload));
      this.logger.debug({ result }, `Published event to channel [${topic.name}]`);
      return result;
    } catch (error) {
      this.logger.error({ error, payload }, `Failed to publish event to channel [${topic.name}]`);
      throw error;
    }
  }
}
