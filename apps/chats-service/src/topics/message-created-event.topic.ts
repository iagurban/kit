import { declareEventsTopic } from '@poslah/util/declare-events-topic';
import { createMessageEventSchema } from '@poslah/util/schemas/create-message-event-schema';

export const messageCreatedEventTopic = declareEventsTopic(
  'events.message.created',
  createMessageEventSchema
);
