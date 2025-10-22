import { declareEventsTopic } from '@poslah/util/declare-events-topic';

import { infoEventSchema } from '../entities/info-event-schema';

export const infoPatchedEventTopic = declareEventsTopic('events.info.patched', infoEventSchema);
