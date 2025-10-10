import { registerEnumType } from '@nestjs/graphql';

export enum UserChatPermissionsScalarFieldEnum {
  userId = 'userId',
  chatId = 'chatId',
  roleId = 'roleId',
  permissions = 'permissions',
}

registerEnumType(UserChatPermissionsScalarFieldEnum, {
  name: 'UserChatPermissionsScalarFieldEnum',
  description: undefined,
});
