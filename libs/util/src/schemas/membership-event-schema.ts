import { z } from 'zod/v4';

import { updateChatPermissionsSchema } from './chat-permissions-schema';
import { baseEventSchema } from './raw-event-schema-parts';

const membershipEventPayloadSchema = z.object({
  // The user whose membership is being changed.
  userId: z.uuid(),
  // The action that was performed.
  action: z.enum(['added', 'removed', 'updated']),
  // The new set of permissions for the user.
  permissions: updateChatPermissionsSchema.partial().optional(),
  // The new role for the user.
  roleId: z.uuid().optional(),
});

export const membershipEventSchema = baseEventSchema.extend({
  type: z.literal('membership'),
  payload: membershipEventPayloadSchema,
});
export type MembershipEventDto = z.infer<typeof membershipEventSchema>;
