import { declareEventsTopic } from '@poslah/util/declare-events-topic';

import { createMessageEventSchema } from '../raw-event-schema';

export const messageCreatedEventTopic = declareEventsTopic(
  'events.message.created',
  createMessageEventSchema
);
