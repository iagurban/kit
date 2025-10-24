import { jsonObjectSchema } from '@gurban/kit/core/json-type';
import { z } from 'zod/v4';

import { stringifiedBigint, stringifiedISODate } from '../zod';

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

export const messageSchema = z.object({
  chatId: z.uuid(),
  nn: stringifiedBigint,
  eventNn: stringifiedBigint,
  authorId: z.uuid(),
  text: z.string().nullable(),
  replyToNn: stringifiedBigint.nullable(),
  attachments: z.array(attachmentInfoSchema).nullable(),
  forwarded: z.array(forwardInfoSchema).nullable(),
  createdAt: stringifiedISODate,
  updatedAt: stringifiedISODate,
  deletedAt: stringifiedISODate.nullable(),
  editedAt: stringifiedISODate.nullable(),
  editedNn: stringifiedBigint.nullable(),
});

export type MessageDto = z.infer<typeof messageSchema>;
