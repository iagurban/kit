import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatRoleCreateWithoutIsDefaultForChatsInput } from './chat-role-create-without-is-default-for-chats.input';
import { ChatRoleWhereUniqueInput } from './chat-role-where-unique.input';

@InputType()
export class ChatRoleCreateOrConnectWithoutIsDefaultForChatsInput {
  @Field(() => ChatRoleWhereUniqueInput, { nullable: false })
  @Type(() => ChatRoleWhereUniqueInput)
  where!: Prisma.AtLeast<ChatRoleWhereUniqueInput, 'id' | 'chatId_name'>;

  @Field(() => ChatRoleCreateWithoutIsDefaultForChatsInput, { nullable: false })
  @Type(() => ChatRoleCreateWithoutIsDefaultForChatsInput)
  create!: ChatRoleCreateWithoutIsDefaultForChatsInput;
}
