import { jsonObjectSchema } from '@poslah/util/json-type';
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
  attachments: z.array(attachmentInfoSchema).optional(),
});

export type ForwardInfoDto = z.infer<typeof forwardInfoSchema>;

const messageMainPartSchema = z.object({
  text: z.string().min(1).optional().nullable(),
  replyToNn: stringifiedBigint.nullable(),
  attachments: z.array(attachmentInfoSchema).optional(),
  forwarded: z.array(forwardInfoSchema).optional(),
});

const messageEventPayloadSchema = <Nn extends z.ZodType>(nn: Nn) =>
  messageMainPartSchema
    .extend({ nn })
    .refine(
      data =>
        Object.keys(data).some(key => key !== 'nn' && (data as Record<string, unknown>)[key] !== undefined),
      {
        message: 'Message payload must contain at least one data field (e.g. text, attachments, forwarded).',
      }
    );

const baseEventSchema = z.object({
  chatId: z.uuid(),
  authorId: z.uuid(),
  nn: stringifiedBigint,
  createdAt: stringifiedISODate,
});

export const createMessageEventSchema = baseEventSchema.extend({
  type: z.literal('message'),
  payload: messageEventPayloadSchema(z.literal(null)),
});

export type CreateMessageEventDTO = z.infer<typeof createMessageEventSchema>;

export const updateMessageEventSchema = baseEventSchema.extend({
  type: z.literal('message'),
  payload: messageEventPayloadSchema(stringifiedBigint),
});

export type UpdateMessageEventDTO = z.infer<typeof updateMessageEventSchema>;

export const someMessageEventSchema = baseEventSchema.extend({
  type: z.literal('message'),
  payload: messageEventPayloadSchema(stringifiedBigint.nullable()),
});

export type MessageEventDto = z.infer<typeof someMessageEventSchema>;

export const infoEventSchema = baseEventSchema.extend({
  type: z.literal('info'),
  payload: z
    .object({
      title: z.string().min(1).optional(),
      bio: z.string().nullable().optional(),
      avatar: z.url().nullable().optional(),
    })
    .refine(data => Object.values(data).some(value => value !== undefined), {
      message: 'Info payload must contain at least one defined field.',
    }),
});

// === Final event schema ===
export const rawEventSchema = z.discriminatedUnion('type', [someMessageEventSchema, infoEventSchema]);

export type RawEventDto = z.infer<typeof rawEventSchema>;
