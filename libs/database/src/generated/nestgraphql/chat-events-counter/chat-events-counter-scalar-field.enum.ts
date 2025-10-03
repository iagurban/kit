import { registerEnumType } from '@nestjs/graphql';

export enum ChatEventsCounterScalarFieldEnum {
  chatId = 'chatId',
  lastNn = 'lastNn',
}

registerEnumType(ChatEventsCounterScalarFieldEnum, {
  name: 'ChatEventsCounterScalarFieldEnum',
  description: undefined,
});
