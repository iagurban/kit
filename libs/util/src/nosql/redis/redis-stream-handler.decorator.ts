import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import type { ZodType } from 'zod/v4';

export const REDIS_STREAM_HANDLER_METADATA = '__redisStreamHandler__';

export type RedisStreamHandlerNestMetadata = { streamName: string; schema: ZodType };

/**
 * Method decorator. Marks a method as a handler for messages from a specific Redis Stream.
 * @param streamName The name of the Redis Stream to subscribe to.
 * @param schema The Zod schema to use for validating the message payload.
 */
export const RedisStreamHandler = (streamName: string, schema: ZodType) =>
  SetMetadata(REDIS_STREAM_HANDLER_METADATA, { streamName, schema } satisfies RedisStreamHandlerNestMetadata);

/**
 * Parameter decorator. Marks a parameter of a handler method to receive the
 * deserialized message payload (the `data` part of the stream message).
 *
 * NOTE: This is currently a placeholder for clarity and future extension.
 * The discovery service will inject the full message object for now.
 */
export const RedisStreamPayload = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  // In a more advanced implementation, this could extract specific parts
  // of the message, but for now, we'll handle that in the discovery service.
  return null;
});
