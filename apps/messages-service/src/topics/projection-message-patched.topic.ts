import { declareEventsTopic } from '@gurban/kit/declare-events-topic';
import { messageSchema } from '@poslah/util/schemas/message.schema';

/**
 * A message-projection has patched in DB
 */
export const projectionMessagePatchedTopic = declareEventsTopic('projection.message.patched', messageSchema);
