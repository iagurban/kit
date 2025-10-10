import { registerEnumType } from '@nestjs/graphql';

export enum ChatRoleOrderByRelevanceFieldEnum {
  id = 'id',
  chatId = 'chatId',
  name = 'name',
}

registerEnumType(ChatRoleOrderByRelevanceFieldEnum, {
  name: 'ChatRoleOrderByRelevanceFieldEnum',
  description: undefined,
});
