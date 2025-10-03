import { Field, InputType } from '@nestjs/graphql';

import { ChatCreateNestedOneWithoutMessagesCounterInput } from '../chat/chat-create-nested-one-without-messages-counter.input';

@InputType()
export class MessagesCounterCreateInput {
  @Field(() => String, { nullable: true })
  lastNn?: bigint | number;

  @Field(() => ChatCreateNestedOneWithoutMessagesCounterInput, { nullable: false })
  chat!: ChatCreateNestedOneWithoutMessagesCounterInput;
}
