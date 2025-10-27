import { stringifiedBigint, stringifiedISODate } from '@gurban/kit/utils/zod-utils';
import { z } from 'zod/v4';

import { attachmentInfoSchema, forwardInfoSchema } from './message.schema';

export type AttachmentInfoDto = z.infer<typeof attachmentInfoSchema>;

export type ForwardInfoDto = z.infer<typeof forwardInfoSchema>;

const messageMainPartSchema = z.object({
  text: z.string().min(1).optional().nullable(),
  replyToNn: stringifiedBigint.nullable(),
  attachments: z.array(attachmentInfoSchema).optional().nullable(),
  forwarded: z.array(forwardInfoSchema).optional().nullable(),
  deletedAt: stringifiedISODate.optional().nullable(),
});

export const messageEventPayloadSchema = <Nn extends z.ZodType>(nn: Nn) =>
  messageMainPartSchema
    .extend({ nn })
    .refine(
      data =>
        Object.keys(data).some(key => key !== 'nn' && (data as Record<string, unknown>)[key] !== undefined),
      {
        message: 'Message payload must contain at least one data field (e.g. text, attachments, forwarded).',
      }
    );

export const baseEventSchema = z.object({
  chatId: z.uuid(),
  authorId: z.uuid(),
  nn: stringifiedBigint,
  createdAt: stringifiedISODate,
});

export const buildMessageEventSchema = <T extends z.ZodType>(nn: T) =>
  baseEventSchema.extend({
    type: z.literal('message'),
    payload: messageEventPayloadSchema(nn),
  });
