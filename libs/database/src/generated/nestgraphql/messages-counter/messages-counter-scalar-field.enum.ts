import { registerEnumType } from '@nestjs/graphql';

export enum MessagesCounterScalarFieldEnum {
  chatId = 'chatId',
  lastNn = 'lastNn',
}

registerEnumType(MessagesCounterScalarFieldEnum, {
  name: 'MessagesCounterScalarFieldEnum',
  description: undefined,
});
