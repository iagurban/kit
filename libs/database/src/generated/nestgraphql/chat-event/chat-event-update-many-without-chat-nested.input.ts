import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatEventCreateManyChatInputEnvelope } from './chat-event-create-many-chat-input-envelope.input';
import { ChatEventCreateOrConnectWithoutChatInput } from './chat-event-create-or-connect-without-chat.input';
import { ChatEventCreateWithoutChatInput } from './chat-event-create-without-chat.input';
import { ChatEventScalarWhereInput } from './chat-event-scalar-where.input';
import { ChatEventUpdateManyWithWhereWithoutChatInput } from './chat-event-update-many-with-where-without-chat.input';
import { ChatEventUpdateWithWhereUniqueWithoutChatInput } from './chat-event-update-with-where-unique-without-chat.input';
import { ChatEventUpsertWithWhereUniqueWithoutChatInput } from './chat-event-upsert-with-where-unique-without-chat.input';
import { ChatEventWhereUniqueInput } from './chat-event-where-unique.input';

@InputType()
export class ChatEventUpdateManyWithoutChatNestedInput {
  @Field(() => [ChatEventCreateWithoutChatInput], { nullable: true })
  @Type(() => ChatEventCreateWithoutChatInput)
  create?: Array<ChatEventCreateWithoutChatInput>;

  @Field(() => [ChatEventCreateOrConnectWithoutChatInput], { nullable: true })
  @Type(() => ChatEventCreateOrConnectWithoutChatInput)
  connectOrCreate?: Array<ChatEventCreateOrConnectWithoutChatInput>;

  @Field(() => [ChatEventUpsertWithWhereUniqueWithoutChatInput], { nullable: true })
  @Type(() => ChatEventUpsertWithWhereUniqueWithoutChatInput)
  upsert?: Array<ChatEventUpsertWithWhereUniqueWithoutChatInput>;

  @Field(() => ChatEventCreateManyChatInputEnvelope, { nullable: true })
  @Type(() => ChatEventCreateManyChatInputEnvelope)
  createMany?: ChatEventCreateManyChatInputEnvelope;

  @Field(() => [ChatEventWhereUniqueInput], { nullable: true })
  @Type(() => ChatEventWhereUniqueInput)
  set?: Array<Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>>;

  @Field(() => [ChatEventWhereUniqueInput], { nullable: true })
  @Type(() => ChatEventWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>>;

  @Field(() => [ChatEventWhereUniqueInput], { nullable: true })
  @Type(() => ChatEventWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>>;

  @Field(() => [ChatEventWhereUniqueInput], { nullable: true })
  @Type(() => ChatEventWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>>;

  @Field(() => [ChatEventUpdateWithWhereUniqueWithoutChatInput], { nullable: true })
  @Type(() => ChatEventUpdateWithWhereUniqueWithoutChatInput)
  update?: Array<ChatEventUpdateWithWhereUniqueWithoutChatInput>;

  @Field(() => [ChatEventUpdateManyWithWhereWithoutChatInput], { nullable: true })
  @Type(() => ChatEventUpdateManyWithWhereWithoutChatInput)
  updateMany?: Array<ChatEventUpdateManyWithWhereWithoutChatInput>;

  @Field(() => [ChatEventScalarWhereInput], { nullable: true })
  @Type(() => ChatEventScalarWhereInput)
  deleteMany?: Array<ChatEventScalarWhereInput>;
}
