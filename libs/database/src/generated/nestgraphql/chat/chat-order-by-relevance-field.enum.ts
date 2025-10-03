import { registerEnumType } from '@nestjs/graphql';

export enum ChatOrderByRelevanceFieldEnum {
  id = 'id',
  title = 'title',
  bio = 'bio',
  avatar = 'avatar',
}

registerEnumType(ChatOrderByRelevanceFieldEnum, {
  name: 'ChatOrderByRelevanceFieldEnum',
  description: undefined,
});
