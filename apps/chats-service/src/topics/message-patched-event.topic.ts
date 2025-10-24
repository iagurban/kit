import { declareEventsTopic } from '@poslah/util/declare-events-topic';
import { updateMessageEventSchema } from '@poslah/util/schemas/update-message-event-schema';

export const messagePatchedEventTopic = declareEventsTopic(
  'events.message.patched',
  updateMessageEventSchema
);
