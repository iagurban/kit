import { registerEnumType } from '@nestjs/graphql';

export enum ChatMemberOrderByRelevanceFieldEnum {
  userId = 'userId',
  chatId = 'chatId',
}

registerEnumType(ChatMemberOrderByRelevanceFieldEnum, {
  name: 'ChatMemberOrderByRelevanceFieldEnum',
  description: undefined,
});
