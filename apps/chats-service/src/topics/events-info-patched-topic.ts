import { declareEventsTopic } from '@gurban/kit/declare-events-topic';
import { infoEventSchema } from '@poslah/util/schemas/info-event-schema';

/**
 * Info-patching event has applied to DB
 */
export const eventsInfoPatchedTopic = declareEventsTopic('events.info.patched', infoEventSchema);
