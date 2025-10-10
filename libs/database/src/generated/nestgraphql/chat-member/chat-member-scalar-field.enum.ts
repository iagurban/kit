import { registerEnumType } from '@nestjs/graphql';

export enum ChatMemberScalarFieldEnum {
  userId = 'userId',
  chatId = 'chatId',
  joinedAt = 'joinedAt',
}

registerEnumType(ChatMemberScalarFieldEnum, { name: 'ChatMemberScalarFieldEnum', description: undefined });
