import { Field, InputType } from '@nestjs/graphql';

import { ChatEventUncheckedCreateNestedManyWithoutChatInput } from '../chat-event/chat-event-unchecked-create-nested-many-without-chat.input';
import { ChatEventsCounterUncheckedCreateNestedOneWithoutChatInput } from '../chat-events-counter/chat-events-counter-unchecked-create-nested-one-without-chat.input';
import { MessagesCounterUncheckedCreateNestedOneWithoutChatInput } from '../messages-counter/messages-counter-unchecked-create-nested-one-without-chat.input';

@InputType()
export class ChatUncheckedCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => ChatEventUncheckedCreateNestedManyWithoutChatInput, { nullable: true })
  events?: ChatEventUncheckedCreateNestedManyWithoutChatInput;

  @Field(() => ChatEventsCounterUncheckedCreateNestedOneWithoutChatInput, { nullable: true })
  eventsCounter?: ChatEventsCounterUncheckedCreateNestedOneWithoutChatInput;

  @Field(() => MessagesCounterUncheckedCreateNestedOneWithoutChatInput, { nullable: true })
  messagesCounter?: MessagesCounterUncheckedCreateNestedOneWithoutChatInput;
}
