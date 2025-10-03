import { Field, InputType } from '@nestjs/graphql';

import { ChatEventCreateNestedManyWithoutChatInput } from '../chat-event/chat-event-create-nested-many-without-chat.input';
import { ChatEventsCounterCreateNestedOneWithoutChatInput } from '../chat-events-counter/chat-events-counter-create-nested-one-without-chat.input';

@InputType()
export class ChatCreateWithoutMessagesCounterInput {
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

  @Field(() => ChatEventsCounterCreateNestedOneWithoutChatInput, { nullable: true })
  eventsCounter?: ChatEventsCounterCreateNestedOneWithoutChatInput;
}
