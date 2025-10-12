import { declareEventsTopic } from '@poslah/util/declare-events-topic';

import { messageSchema } from '../modules/messages/messages-db';

export const projectionMessagePatchedTopic = declareEventsTopic('projection.message.patched', messageSchema);
