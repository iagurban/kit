import { registerEnumType } from '@nestjs/graphql';

export enum ChatEventsCounterOrderByRelevanceFieldEnum {
  chatId = 'chatId',
}

registerEnumType(ChatEventsCounterOrderByRelevanceFieldEnum, {
  name: 'ChatEventsCounterOrderByRelevanceFieldEnum',
  description: undefined,
});
