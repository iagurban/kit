import { Field, InputType } from '@nestjs/graphql';

import { ChatCreateNestedOneWithoutEventsCounterInput } from '../chat/chat-create-nested-one-without-events-counter.input';

@InputType()
export class ChatEventsCounterCreateInput {
  @Field(() => String, { nullable: true })
  lastNn?: bigint | number;

  @Field(() => ChatCreateNestedOneWithoutEventsCounterInput, { nullable: false })
  chat!: ChatCreateNestedOneWithoutEventsCounterInput;
}
