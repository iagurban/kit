import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatRoleCreateWithoutChatInput } from './chat-role-create-without-chat.input';
import { ChatRoleWhereUniqueInput } from './chat-role-where-unique.input';

@InputType()
export class ChatRoleCreateOrConnectWithoutChatInput {
  @Field(() => ChatRoleWhereUniqueInput, { nullable: false })
  @Type(() => ChatRoleWhereUniqueInput)
  where!: Prisma.AtLeast<ChatRoleWhereUniqueInput, 'id' | 'chatId_name'>;

  @Field(() => ChatRoleCreateWithoutChatInput, { nullable: false })
  @Type(() => ChatRoleCreateWithoutChatInput)
  create!: ChatRoleCreateWithoutChatInput;
}
