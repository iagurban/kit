import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatRoleCreateWithoutChatInput } from './chat-role-create-without-chat.input';
import { ChatRoleUpdateWithoutChatInput } from './chat-role-update-without-chat.input';
import { ChatRoleWhereUniqueInput } from './chat-role-where-unique.input';

@InputType()
export class ChatRoleUpsertWithWhereUniqueWithoutChatInput {
  @Field(() => ChatRoleWhereUniqueInput, { nullable: false })
  @Type(() => ChatRoleWhereUniqueInput)
  where!: Prisma.AtLeast<ChatRoleWhereUniqueInput, 'id' | 'chatId_name'>;

  @Field(() => ChatRoleUpdateWithoutChatInput, { nullable: false })
  @Type(() => ChatRoleUpdateWithoutChatInput)
  update!: ChatRoleUpdateWithoutChatInput;

  @Field(() => ChatRoleCreateWithoutChatInput, { nullable: false })
  @Type(() => ChatRoleCreateWithoutChatInput)
  create!: ChatRoleCreateWithoutChatInput;
}
