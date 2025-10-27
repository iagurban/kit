import { declareEventsTopic } from '@gurban/kit/declare-events-topic';
import { messageSchema } from '@poslah/util/schemas/message.schema';

/**
 * A message-projection has created in DB
 */
export const projectionMessageCreatedTopic = declareEventsTopic('projection.message.created', messageSchema);
