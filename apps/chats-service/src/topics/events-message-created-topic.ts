import { declareEventsTopic } from '@gurban/kit/declare-events-topic';
import { createMessageEventSchema } from '@poslah/util/schemas/create-message-event-schema';

/**
 * A message-creating event has saved to DB
 */
export const eventsMessageCreatedTopic = declareEventsTopic(
  'events.message.created',
  createMessageEventSchema
);
