import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatEventsCounterCreateWithoutChatInput } from './chat-events-counter-create-without-chat.input';
import { ChatEventsCounterWhereUniqueInput } from './chat-events-counter-where-unique.input';

@InputType()
export class ChatEventsCounterCreateOrConnectWithoutChatInput {
  @Field(() => ChatEventsCounterWhereUniqueInput, { nullable: false })
  @Type(() => ChatEventsCounterWhereUniqueInput)
  where!: Prisma.AtLeast<ChatEventsCounterWhereUniqueInput, 'chatId'>;

  @Field(() => ChatEventsCounterCreateWithoutChatInput, { nullable: false })
  @Type(() => ChatEventsCounterCreateWithoutChatInput)
  create!: ChatEventsCounterCreateWithoutChatInput;
}
