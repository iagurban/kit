import { declareEventsTopic } from '@poslah/util/declare-events-topic';
import { messageSchema } from '@poslah/util/schemas/message.schema';

export const projectionMessageCreatedTopic = declareEventsTopic('projection.message.created', messageSchema);
