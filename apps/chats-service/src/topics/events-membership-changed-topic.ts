import { declareEventsTopic } from '@gurban/kit/declare-events-topic';
import { membershipEventSchema } from '@poslah/util/schemas/membership-event-schema';

/**
 * Membership-changing event has applied to DB
 */
export const eventsMembershipChangedTopic = declareEventsTopic(
  'events.membership.changed',
  membershipEventSchema
);
