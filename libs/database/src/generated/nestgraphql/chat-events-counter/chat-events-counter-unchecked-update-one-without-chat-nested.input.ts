import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatEventsCounterCreateOrConnectWithoutChatInput } from './chat-events-counter-create-or-connect-without-chat.input';
import { ChatEventsCounterCreateWithoutChatInput } from './chat-events-counter-create-without-chat.input';
import { ChatEventsCounterUpdateToOneWithWhereWithoutChatInput } from './chat-events-counter-update-to-one-with-where-without-chat.input';
import { ChatEventsCounterUpsertWithoutChatInput } from './chat-events-counter-upsert-without-chat.input';
import { ChatEventsCounterWhereInput } from './chat-events-counter-where.input';
import { ChatEventsCounterWhereUniqueInput } from './chat-events-counter-where-unique.input';

@InputType()
export class ChatEventsCounterUncheckedUpdateOneWithoutChatNestedInput {
  @Field(() => ChatEventsCounterCreateWithoutChatInput, { nullable: true })
  @Type(() => ChatEventsCounterCreateWithoutChatInput)
  create?: ChatEventsCounterCreateWithoutChatInput;

  @Field(() => ChatEventsCounterCreateOrConnectWithoutChatInput, { nullable: true })
  @Type(() => ChatEventsCounterCreateOrConnectWithoutChatInput)
  connectOrCreate?: ChatEventsCounterCreateOrConnectWithoutChatInput;

  @Field(() => ChatEventsCounterUpsertWithoutChatInput, { nullable: true })
  @Type(() => ChatEventsCounterUpsertWithoutChatInput)
  upsert?: ChatEventsCounterUpsertWithoutChatInput;

  @Field(() => ChatEventsCounterWhereInput, { nullable: true })
  @Type(() => ChatEventsCounterWhereInput)
  disconnect?: ChatEventsCounterWhereInput;

  @Field(() => ChatEventsCounterWhereInput, { nullable: true })
  @Type(() => ChatEventsCounterWhereInput)
  delete?: ChatEventsCounterWhereInput;

  @Field(() => ChatEventsCounterWhereUniqueInput, { nullable: true })
  @Type(() => ChatEventsCounterWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatEventsCounterWhereUniqueInput, 'chatId'>;

  @Field(() => ChatEventsCounterUpdateToOneWithWhereWithoutChatInput, { nullable: true })
  @Type(() => ChatEventsCounterUpdateToOneWithWhereWithoutChatInput)
  update?: ChatEventsCounterUpdateToOneWithWhereWithoutChatInput;
}
