import { declareEventsTopic } from '@gurban/kit/declare-events-topic';
import { rawEventSchema } from '@poslah/util/schemas/raw-event-schema';

/**
 * Authorized raw message just came from a client
 */
export const eventsRawCreateTopic = declareEventsTopic('events.raw.create', rawEventSchema);
