import { registerEnumType } from '@nestjs/graphql';

export enum MessagesCounterOrderByRelevanceFieldEnum {
  chatId = 'chatId',
}

registerEnumType(MessagesCounterOrderByRelevanceFieldEnum, {
  name: 'MessagesCounterOrderByRelevanceFieldEnum',
  description: undefined,
});
