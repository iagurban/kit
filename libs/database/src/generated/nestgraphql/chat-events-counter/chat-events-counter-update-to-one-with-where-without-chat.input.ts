import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventsCounterUpdateWithoutChatInput } from './chat-events-counter-update-without-chat.input';
import { ChatEventsCounterWhereInput } from './chat-events-counter-where.input';

@InputType()
export class ChatEventsCounterUpdateToOneWithWhereWithoutChatInput {
  @Field(() => ChatEventsCounterWhereInput, { nullable: true })
  @Type(() => ChatEventsCounterWhereInput)
  where?: ChatEventsCounterWhereInput;

  @Field(() => ChatEventsCounterUpdateWithoutChatInput, { nullable: false })
  @Type(() => ChatEventsCounterUpdateWithoutChatInput)
  data!: ChatEventsCounterUpdateWithoutChatInput;
}
