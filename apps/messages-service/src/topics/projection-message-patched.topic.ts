import { declareEventsTopic } from '@poslah/util/declare-events-topic';
import { messageSchema } from '@poslah/util/schemas/message.schema';

export const projectionMessagePatchedTopic = declareEventsTopic('projection.message.patched', messageSchema);
