import { mapOwnEntries } from '@gurban/kit/utils/object-utils';
import { z } from 'zod/v4';

const permissionsCommonFields = {
  sendMessage: z.boolean(),
  deleteOwnMessages: z.boolean(),
  deleteAllMessages: z.boolean(),
  invite: z.boolean(),
  kick: z.boolean(),
  editInfo: z.boolean(),
  joinByInvite: z.boolean(),
  joinByButton: z.boolean(),
} as const;

export const updateChatPermissionsSchema = z.object(
  mapOwnEntries(permissionsCommonFields, v => v.nullable())
);
export type UpdateChatPermissionsDto = z.infer<typeof updateChatPermissionsSchema>;

export const chatPermissionsSchema = z.object(permissionsCommonFields).extend({
  changeOwner: z.boolean(),
});
export type ChatPermissionsDto = z.infer<typeof chatPermissionsSchema>;
