import { checked, isString } from '@gurban/kit/core/checks';
import { once } from '@gurban/kit/core/once';
import type { Topic } from '@gurban/kit/declare-events-topic';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Injectable, Module } from '@nestjs/common';
import { z } from 'zod/v4';

import { RedisStaticModule } from '../../ready-modules/redis-static-module';
import { Logger } from '../logger/logger.module';
import { RedisService } from '../nosql/redis/redis.service';

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
    rawEvent: unknown,
    onBeforePublish?: (data: z.output<T[`schema`]>) => Promise<z.output<T[`schema`]> | void>
  ): Promise<{
    messageId: string;
    sent: { string: string; json: z.input<T[`schema`]>; decoded: z.output<T[`schema`]> };
  }> {
    try {
      // encode() will throw if can't get a json-object from "output".
      let realOutput: z.output<T[`schema`]> = rawEvent as z.output<T[`schema`]>;
      let realInput: z.input<T[`schema`]> = topic.schema.encode(realOutput);
      if (onBeforePublish) {
        const newRawEvent = await onBeforePublish(realOutput);
        if (newRawEvent) {
          realInput = topic.schema.encode(newRawEvent);
          realOutput = newRawEvent;
        }
      }

      const eventPayload = JSON.stringify(realInput);
      const result = await this.redis.xadd(topic.name, '*', 'data', eventPayload);

      this.logger.debug(`Successfully published event to stream [${topic.name}]`);

      return {
        messageId: checked(result, isString, () => `Unexpected null return from XADD`),
        sent: { string: eventPayload, json: realInput, decoded: realOutput },
      };
    } catch (error) {
      this.logger.error({ error }, `Failed to publish event to stream [${topic.name}]`);
      throw error;
    }
  }
}

@Module({
  imports: [RedisStaticModule],
  providers: [MqPublisher],
  exports: [MqPublisher],
})
export class MqPublisherModule {}
