import { declareEventsTopic } from '@gurban/kit/declare-events-topic';
import { z } from 'zod/v4';

const userMembershipPayload = z.object({
  userId: z.uuid(),
  chatId: z.uuid(),
  action: z.enum(['join', 'leave']),
});

export type UserMembershipPubsubDto = z.infer<typeof userMembershipPayload>;

/**
 * PubSub-channel where user-to-chat relation changes are published
 */
export const userMembershipPubsub = declareEventsTopic('user-memberships', userMembershipPayload);
