import { registerEnumType } from '@nestjs/graphql';

export enum ChatEventScalarFieldEnum {
  id = 'id',
  nn = 'nn',
  chatId = 'chatId',
  authorId = 'authorId',
  type = 'type',
  payload = 'payload',
  createdAt = 'createdAt',
}

registerEnumType(ChatEventScalarFieldEnum, { name: 'ChatEventScalarFieldEnum', description: undefined });
