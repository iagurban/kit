import { declareEventsTopic } from '@poslah/util/declare-events-topic';

import { messageSchema } from './messages-db';

export const messagesTopics = {
  created: declareEventsTopic('projection.messages.created', messageSchema),
  patched: declareEventsTopic('projection.messages.patched', messageSchema),
} as const;
