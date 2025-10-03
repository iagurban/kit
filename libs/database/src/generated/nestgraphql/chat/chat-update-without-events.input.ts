import { Field, InputType } from '@nestjs/graphql';

import { ChatEventsCounterUpdateOneWithoutChatNestedInput } from '../chat-events-counter/chat-events-counter-update-one-without-chat-nested.input';
import { MessagesCounterUpdateOneWithoutChatNestedInput } from '../messages-counter/messages-counter-update-one-without-chat-nested.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class ChatUpdateWithoutEventsInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  title?: StringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  bio?: NullableStringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  avatar?: NullableStringFieldUpdateOperationsInput;

  @Field(() => ChatEventsCounterUpdateOneWithoutChatNestedInput, { nullable: true })
  eventsCounter?: ChatEventsCounterUpdateOneWithoutChatNestedInput;

  @Field(() => MessagesCounterUpdateOneWithoutChatNestedInput, { nullable: true })
  messagesCounter?: MessagesCounterUpdateOneWithoutChatNestedInput;
}
