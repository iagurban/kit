import { declareEventsTopic } from '@poslah/util/declare-events-topic';
import { z } from 'zod/v4';

const userMembershipPayload = z.object({
  userId: z.uuid(),
  chatId: z.uuid(),
  action: z.enum(['join', 'leave']),
});

export const userMembershipPubsub = declareEventsTopic('user-memberships', userMembershipPayload);
