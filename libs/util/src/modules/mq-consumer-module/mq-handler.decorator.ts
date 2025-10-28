import { SetMetadata } from '@nestjs/common';
import type { ZodType } from 'zod/v4';

export const MQ_HANDLER_METADATA = '__mqStreamHandler__';

export type MqHandlerNestMetadata = { streamName: string; schema: ZodType };

/**
 * Method decorator. Marks a method as a handler for messages from a specific Redis Stream.
 * @param streamName The name of the Redis Stream to subscribe to.
 * @param schema The Zod schema to use for validating the message payload.
 */
export const MqHandler = ({ name: streamName, schema }: { name: string; schema: ZodType }) =>
  SetMetadata(MQ_HANDLER_METADATA, { streamName, schema } satisfies MqHandlerNestMetadata);
