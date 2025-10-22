import { declareEventsTopic } from '@poslah/util/declare-events-topic';

import { membershipEventSchema } from '../entities/membership-event-schema';

/**
 * The durable Redis Stream topic for all membership change events.
 */
export const membershipChangedEventTopic = declareEventsTopic(
  'events.membership.changed',
  membershipEventSchema
);
