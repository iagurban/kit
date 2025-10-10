import { registerEnumType } from '@nestjs/graphql';

export enum ChatOrderByRelevanceFieldEnum {
  id = 'id',
  title = 'title',
  bio = 'bio',
  avatar = 'avatar',
  ownerId = 'ownerId',
  defaultRoleId = 'defaultRoleId',
}

registerEnumType(ChatOrderByRelevanceFieldEnum, {
  name: 'ChatOrderByRelevanceFieldEnum',
  description: undefined,
});
