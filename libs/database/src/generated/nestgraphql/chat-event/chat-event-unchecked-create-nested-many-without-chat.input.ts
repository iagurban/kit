import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatEventCreateManyChatInputEnvelope } from './chat-event-create-many-chat-input-envelope.input';
import { ChatEventCreateOrConnectWithoutChatInput } from './chat-event-create-or-connect-without-chat.input';
import { ChatEventCreateWithoutChatInput } from './chat-event-create-without-chat.input';
import { ChatEventWhereUniqueInput } from './chat-event-where-unique.input';

@InputType()
export class ChatEventUncheckedCreateNestedManyWithoutChatInput {
  @Field(() => [ChatEventCreateWithoutChatInput], { nullable: true })
  @Type(() => ChatEventCreateWithoutChatInput)
  create?: Array<ChatEventCreateWithoutChatInput>;

  @Field(() => [ChatEventCreateOrConnectWithoutChatInput], { nullable: true })
  @Type(() => ChatEventCreateOrConnectWithoutChatInput)
  connectOrCreate?: Array<ChatEventCreateOrConnectWithoutChatInput>;

  @Field(() => ChatEventCreateManyChatInputEnvelope, { nullable: true })
  @Type(() => ChatEventCreateManyChatInputEnvelope)
  createMany?: ChatEventCreateManyChatInputEnvelope;

  @Field(() => [ChatEventWhereUniqueInput], { nullable: true })
  @Type(() => ChatEventWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>>;
}
