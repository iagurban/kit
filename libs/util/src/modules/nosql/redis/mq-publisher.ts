import { once } from '@gurban/kit/core/once';
import type { Topic } from '@gurban/kit/declare-events-topic';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Injectable } from '@nestjs/common';
import { z } from 'zod/v4';

import { Logger } from '../../logger/logger.module';
import { RedisService } from './redis.service';

@Injectable()
export class MqPublisher {
  constructor(
    private readonly redis: RedisService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, MqPublisher.name);
  }

  /**
   * A generic, type-safe method to publish an event to a Redis Stream.
   * It validates the event against the topic's schema before publishing.
   */
  async publish<S extends z.ZodType, T extends Topic<S, string>>(
    topic: T,
    event: unknown,
    onBeforePublish?: (data: z.infer<T[`schema`]>) => Promise<void>
  ): Promise<string | null> {
    try {
      // The schema is already parsed, but this is a final guarantee.
      const validatedEvent = topic.schema.parse(event);
      onBeforePublish && (await onBeforePublish(validatedEvent));
      const eventPayload = JSON.stringify(validatedEvent);

      const result = await this.redis.xadd(topic.name, '*', 'data', eventPayload);

      this.logger.silent(`Successfully published event to stream [${topic.name}]`);

      return result;
    } catch (error) {
      this.logger.error({ error }, `Failed to publish event to stream [${topic.name}]`);
      // Re-throw the error so the caller can handle it (e.g., in a consumer, this would prevent an ack).
      throw error;
    }
  }
}
