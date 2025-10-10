import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatMemberCreateManyChatInputEnvelope } from './chat-member-create-many-chat-input-envelope.input';
import { ChatMemberCreateOrConnectWithoutChatInput } from './chat-member-create-or-connect-without-chat.input';
import { ChatMemberCreateWithoutChatInput } from './chat-member-create-without-chat.input';
import { ChatMemberWhereUniqueInput } from './chat-member-where-unique.input';

@InputType()
export class ChatMemberCreateNestedManyWithoutChatInput {
  @Field(() => [ChatMemberCreateWithoutChatInput], { nullable: true })
  @Type(() => ChatMemberCreateWithoutChatInput)
  create?: Array<ChatMemberCreateWithoutChatInput>;

  @Field(() => [ChatMemberCreateOrConnectWithoutChatInput], { nullable: true })
  @Type(() => ChatMemberCreateOrConnectWithoutChatInput)
  connectOrCreate?: Array<ChatMemberCreateOrConnectWithoutChatInput>;

  @Field(() => ChatMemberCreateManyChatInputEnvelope, { nullable: true })
  @Type(() => ChatMemberCreateManyChatInputEnvelope)
  createMany?: ChatMemberCreateManyChatInputEnvelope;

  @Field(() => [ChatMemberWhereUniqueInput], { nullable: true })
  @Type(() => ChatMemberWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>>;
}
