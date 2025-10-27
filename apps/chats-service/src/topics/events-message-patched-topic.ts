import { declareEventsTopic } from '@gurban/kit/declare-events-topic';
import { updateMessageEventSchema } from '@poslah/util/schemas/update-message-event-schema';

/**
 * A message-patching event has saved to DB
 */
export const eventsMessagePatchedTopic = declareEventsTopic(
  'events.message.patched',
  updateMessageEventSchema
);
