import { registerEnumType } from '@nestjs/graphql';

export enum ChatEventOrderByRelevanceFieldEnum {
  chatId = 'chatId',
  authorId = 'authorId',
  type = 'type',
}

registerEnumType(ChatEventOrderByRelevanceFieldEnum, {
  name: 'ChatEventOrderByRelevanceFieldEnum',
  description: undefined,
});
