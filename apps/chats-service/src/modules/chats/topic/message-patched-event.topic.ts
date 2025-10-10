import { declareEventsTopic } from '@poslah/util/declare-events-topic';

import { updateMessageEventSchema } from '../raw-event-schema';

export const messagePatchedEventTopic = declareEventsTopic(
  'events.message.patched',
  updateMessageEventSchema
);
