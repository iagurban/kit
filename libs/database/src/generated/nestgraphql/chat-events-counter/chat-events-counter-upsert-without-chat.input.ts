import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventsCounterCreateWithoutChatInput } from './chat-events-counter-create-without-chat.input';
import { ChatEventsCounterUpdateWithoutChatInput } from './chat-events-counter-update-without-chat.input';
import { ChatEventsCounterWhereInput } from './chat-events-counter-where.input';

@InputType()
export class ChatEventsCounterUpsertWithoutChatInput {
  @Field(() => ChatEventsCounterUpdateWithoutChatInput, { nullable: false })
  @Type(() => ChatEventsCounterUpdateWithoutChatInput)
  update!: ChatEventsCounterUpdateWithoutChatInput;

  @Field(() => ChatEventsCounterCreateWithoutChatInput, { nullable: false })
  @Type(() => ChatEventsCounterCreateWithoutChatInput)
  create!: ChatEventsCounterCreateWithoutChatInput;

  @Field(() => ChatEventsCounterWhereInput, { nullable: true })
  @Type(() => ChatEventsCounterWhereInput)
  where?: ChatEventsCounterWhereInput;
}
