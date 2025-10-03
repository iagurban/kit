import { Field, InputType } from '@nestjs/graphql';

import { ChatEventsCounterCreateNestedOneWithoutChatInput } from '../chat-events-counter/chat-events-counter-create-nested-one-without-chat.input';
import { MessagesCounterCreateNestedOneWithoutChatInput } from '../messages-counter/messages-counter-create-nested-one-without-chat.input';

@InputType()
export class ChatCreateWithoutEventsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => ChatEventsCounterCreateNestedOneWithoutChatInput, { nullable: true })
  eventsCounter?: ChatEventsCounterCreateNestedOneWithoutChatInput;

  @Field(() => MessagesCounterCreateNestedOneWithoutChatInput, { nullable: true })
  messagesCounter?: MessagesCounterCreateNestedOneWithoutChatInput;
}
