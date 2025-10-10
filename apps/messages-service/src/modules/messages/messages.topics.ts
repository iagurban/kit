import { declareEventsTopic } from '@poslah/util/declare-events-topic';

import { messageSchema } from './messages-db';

export const projectionMessagesCreated = declareEventsTopic('projection.messages.created', messageSchema);
export const projectionMessagesPatched = declareEventsTopic('projection.messages.patched', messageSchema);
