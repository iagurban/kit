import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatRoleCreateManyChatInputEnvelope } from './chat-role-create-many-chat-input-envelope.input';
import { ChatRoleCreateOrConnectWithoutChatInput } from './chat-role-create-or-connect-without-chat.input';
import { ChatRoleCreateWithoutChatInput } from './chat-role-create-without-chat.input';
import { ChatRoleScalarWhereInput } from './chat-role-scalar-where.input';
import { ChatRoleUpdateManyWithWhereWithoutChatInput } from './chat-role-update-many-with-where-without-chat.input';
import { ChatRoleUpdateWithWhereUniqueWithoutChatInput } from './chat-role-update-with-where-unique-without-chat.input';
import { ChatRoleUpsertWithWhereUniqueWithoutChatInput } from './chat-role-upsert-with-where-unique-without-chat.input';
import { ChatRoleWhereUniqueInput } from './chat-role-where-unique.input';

@InputType()
export class ChatRoleUncheckedUpdateManyWithoutChatNestedInput {
  @Field(() => [ChatRoleCreateWithoutChatInput], { nullable: true })
  @Type(() => ChatRoleCreateWithoutChatInput)
  create?: Array<ChatRoleCreateWithoutChatInput>;

  @Field(() => [ChatRoleCreateOrConnectWithoutChatInput], { nullable: true })
  @Type(() => ChatRoleCreateOrConnectWithoutChatInput)
  connectOrCreate?: Array<ChatRoleCreateOrConnectWithoutChatInput>;

  @Field(() => [ChatRoleUpsertWithWhereUniqueWithoutChatInput], { nullable: true })
  @Type(() => ChatRoleUpsertWithWhereUniqueWithoutChatInput)
  upsert?: Array<ChatRoleUpsertWithWhereUniqueWithoutChatInput>;

  @Field(() => ChatRoleCreateManyChatInputEnvelope, { nullable: true })
  @Type(() => ChatRoleCreateManyChatInputEnvelope)
  createMany?: ChatRoleCreateManyChatInputEnvelope;

  @Field(() => [ChatRoleWhereUniqueInput], { nullable: true })
  @Type(() => ChatRoleWhereUniqueInput)
  set?: Array<Prisma.AtLeast<ChatRoleWhereUniqueInput, 'id' | 'chatId_name'>>;

  @Field(() => [ChatRoleWhereUniqueInput], { nullable: true })
  @Type(() => ChatRoleWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<ChatRoleWhereUniqueInput, 'id' | 'chatId_name'>>;

  @Field(() => [ChatRoleWhereUniqueInput], { nullable: true })
  @Type(() => ChatRoleWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<ChatRoleWhereUniqueInput, 'id' | 'chatId_name'>>;

  @Field(() => [ChatRoleWhereUniqueInput], { nullable: true })
  @Type(() => ChatRoleWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ChatRoleWhereUniqueInput, 'id' | 'chatId_name'>>;

  @Field(() => [ChatRoleUpdateWithWhereUniqueWithoutChatInput], { nullable: true })
  @Type(() => ChatRoleUpdateWithWhereUniqueWithoutChatInput)
  update?: Array<ChatRoleUpdateWithWhereUniqueWithoutChatInput>;

  @Field(() => [ChatRoleUpdateManyWithWhereWithoutChatInput], { nullable: true })
  @Type(() => ChatRoleUpdateManyWithWhereWithoutChatInput)
  updateMany?: Array<ChatRoleUpdateManyWithWhereWithoutChatInput>;

  @Field(() => [ChatRoleScalarWhereInput], { nullable: true })
  @Type(() => ChatRoleScalarWhereInput)
  deleteMany?: Array<ChatRoleScalarWhereInput>;
}
