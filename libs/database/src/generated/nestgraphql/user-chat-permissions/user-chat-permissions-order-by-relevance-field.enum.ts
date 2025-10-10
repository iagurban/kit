import { registerEnumType } from '@nestjs/graphql';

export enum UserChatPermissionsOrderByRelevanceFieldEnum {
  userId = 'userId',
  chatId = 'chatId',
  roleId = 'roleId',
}

registerEnumType(UserChatPermissionsOrderByRelevanceFieldEnum, {
  name: 'UserChatPermissionsOrderByRelevanceFieldEnum',
  description: undefined,
});
