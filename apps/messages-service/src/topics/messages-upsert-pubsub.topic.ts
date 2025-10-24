import { declareEventsTopic } from '@poslah/util/declare-events-topic';
import { messageSchema } from '@poslah/util/schemas/message.schema';
import { z } from 'zod/v4';

const attachmentPreview = z.object({
  type: z.string(),
  thumbnail: z.url().optional(),
});

const replyToPreview = z.object({
  nn: z.string(),
  authorId: z.uuid(),
  text: z.string().optional(),
  attachments: z.array(attachmentPreview).optional(),
});

const messageUpsertPayload = messageSchema.extend({
  replyToPreview: replyToPreview.optional(),
});

export type PubsubMessageDto = z.infer<typeof messageUpsertPayload>;

export const messagesUpsertPubsub = declareEventsTopic('messages-upsert', messageUpsertPayload);
