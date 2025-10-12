import { declareEventsTopic } from '@poslah/util/declare-events-topic';

import { messageSchema } from '../modules/messages/messages-db';

export const projectionMessageCreatedTopic = declareEventsTopic('projection.message.created', messageSchema);
