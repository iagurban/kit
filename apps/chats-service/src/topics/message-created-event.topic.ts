import { declareEventsTopic } from '@poslah/util/declare-events-topic';

import { createMessageEventSchema } from '../entities/create-message-event-schema';

export const messageCreatedEventTopic = declareEventsTopic(
  'events.message.created',
  createMessageEventSchema
);
