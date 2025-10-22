import { jsonObjectSchema } from '@gurban/kit/core/json-type';
import { stringifiedBigint, stringifiedISODate } from '@poslah/util/zod';
import { z } from 'zod/v4';

export const attachmentInfoSchema = z.object({
  fileId: z.uuid(),
  mimeType: z.string(),
  url: z.url(),
  filename: z.string(),
  size: stringifiedBigint,
  metadata: jsonObjectSchema.optional().nullable(),
});
export type AttachmentInfoDto = z.infer<typeof attachmentInfoSchema>;

export const forwardInfoSchema = z.object({
  chatId: z.uuid(),
  nn: stringifiedBigint,
  text: z.string().optional().nullable(),
  authorId: z.uuid(),
  createdAt: stringifiedISODate,
  attachments: z.array(attachmentInfoSchema).optional().nullable(),
});
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
