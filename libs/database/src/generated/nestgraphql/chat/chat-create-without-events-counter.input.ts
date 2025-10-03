import { Field, InputType } from '@nestjs/graphql';

import { ChatEventCreateNestedManyWithoutChatInput } from '../chat-event/chat-event-create-nested-many-without-chat.input';
import { MessagesCounterCreateNestedOneWithoutChatInput } from '../messages-counter/messages-counter-create-nested-one-without-chat.input';

@InputType()
export class ChatCreateWithoutEventsCounterInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => ChatEventCreateNestedManyWithoutChatInput, { nullable: true })
  events?: ChatEventCreateNestedManyWithoutChatInput;

  @Field(() => MessagesCounterCreateNestedOneWithoutChatInput, { nullable: true })
  messagesCounter?: MessagesCounterCreateNestedOneWithoutChatInput;
}
