import { declareEventsTopic } from '@poslah/util/declare-events-topic';

import { createMessageEventSchema } from '../entities/raw-event-schema';

export const messageCreatedEventTopic = declareEventsTopic(
  'events.message.created',
  createMessageEventSchema
);
