import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatRoleCreateManyChatInputEnvelope } from './chat-role-create-many-chat-input-envelope.input';
import { ChatRoleCreateOrConnectWithoutChatInput } from './chat-role-create-or-connect-without-chat.input';
import { ChatRoleCreateWithoutChatInput } from './chat-role-create-without-chat.input';
import { ChatRoleWhereUniqueInput } from './chat-role-where-unique.input';

@InputType()
export class ChatRoleUncheckedCreateNestedManyWithoutChatInput {
  @Field(() => [ChatRoleCreateWithoutChatInput], { nullable: true })
  @Type(() => ChatRoleCreateWithoutChatInput)
  create?: Array<ChatRoleCreateWithoutChatInput>;

  @Field(() => [ChatRoleCreateOrConnectWithoutChatInput], { nullable: true })
  @Type(() => ChatRoleCreateOrConnectWithoutChatInput)
  connectOrCreate?: Array<ChatRoleCreateOrConnectWithoutChatInput>;

  @Field(() => ChatRoleCreateManyChatInputEnvelope, { nullable: true })
  @Type(() => ChatRoleCreateManyChatInputEnvelope)
  createMany?: ChatRoleCreateManyChatInputEnvelope;

  @Field(() => [ChatRoleWhereUniqueInput], { nullable: true })
  @Type(() => ChatRoleWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ChatRoleWhereUniqueInput, 'id' | 'chatId_name'>>;
}
