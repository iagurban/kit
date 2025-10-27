import { SetMetadata } from '@nestjs/common';
import type { ZodType } from 'zod/v4';

export const REDIS_STREAM_HANDLER_METADATA = '__redisStreamHandler__';

export type RedisStreamHandlerNestMetadata = { streamName: string; schema: ZodType };

/**
 * Method decorator. Marks a method as a handler for messages from a specific Redis Stream.
 * @param streamName The name of the Redis Stream to subscribe to.
 * @param schema The Zod schema to use for validating the message payload.
 */
export const RedisStreamHandler = ({ name: streamName, schema }: { name: string; schema: ZodType }) =>
  SetMetadata(REDIS_STREAM_HANDLER_METADATA, { streamName, schema } satisfies RedisStreamHandlerNestMetadata);
