import { declareEventsTopic } from '@poslah/util/declare-events-topic';
import { rawEventSchema } from '@poslah/util/schemas/raw-event-schema';

// Raw event for internal processing
export const rawCreateEventTopic = declareEventsTopic('events.raw.create', rawEventSchema);
