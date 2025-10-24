import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatEventsCounterCreateOrConnectWithoutChatInput } from './chat-events-counter-create-or-connect-without-chat.input';
import { ChatEventsCounterCreateWithoutChatInput } from './chat-events-counter-create-without-chat.input';
import { ChatEventsCounterWhereUniqueInput } from './chat-events-counter-where-unique.input';

@InputType()
export class ChatEventsCounterUncheckedCreateNestedOneWithoutChatInput {
  @Field(() => ChatEventsCounterCreateWithoutChatInput, { nullable: true })
  @Type(() => ChatEventsCounterCreateWithoutChatInput)
  create?: ChatEventsCounterCreateWithoutChatInput;

  @Field(() => ChatEventsCounterCreateOrConnectWithoutChatInput, { nullable: true })
  @Type(() => ChatEventsCounterCreateOrConnectWithoutChatInput)
  connectOrCreate?: ChatEventsCounterCreateOrConnectWithoutChatInput;

  @Field(() => ChatEventsCounterWhereUniqueInput, { nullable: true })
  @Type(() => ChatEventsCounterWhereUniqueInput)
  connect?: Prisma.AtLeast<ChatEventsCounterWhereUniqueInput, 'chatId'>;
}
