import { Field, InputType } from '@nestjs/graphql';

import { ChatEventsCounterUncheckedCreateNestedOneWithoutChatInput } from '../chat-events-counter/chat-events-counter-unchecked-create-nested-one-without-chat.input';
import { MessagesCounterUncheckedCreateNestedOneWithoutChatInput } from '../messages-counter/messages-counter-unchecked-create-nested-one-without-chat.input';

@InputType()
export class ChatUncheckedCreateWithoutEventsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => ChatEventsCounterUncheckedCreateNestedOneWithoutChatInput, { nullable: true })
  eventsCounter?: ChatEventsCounterUncheckedCreateNestedOneWithoutChatInput;

  @Field(() => MessagesCounterUncheckedCreateNestedOneWithoutChatInput, { nullable: true })
  messagesCounter?: MessagesCounterUncheckedCreateNestedOneWithoutChatInput;
}
