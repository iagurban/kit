import { Field, InputType } from '@nestjs/graphql';

import { ChatEventsCounterUncheckedUpdateOneWithoutChatNestedInput } from '../chat-events-counter/chat-events-counter-unchecked-update-one-without-chat-nested.input';
import { MessagesCounterUncheckedUpdateOneWithoutChatNestedInput } from '../messages-counter/messages-counter-unchecked-update-one-without-chat-nested.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class ChatUncheckedUpdateWithoutEventsInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  title?: StringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  bio?: NullableStringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  avatar?: NullableStringFieldUpdateOperationsInput;

  @Field(() => ChatEventsCounterUncheckedUpdateOneWithoutChatNestedInput, { nullable: true })
  eventsCounter?: ChatEventsCounterUncheckedUpdateOneWithoutChatNestedInput;

  @Field(() => MessagesCounterUncheckedUpdateOneWithoutChatNestedInput, { nullable: true })
  messagesCounter?: MessagesCounterUncheckedUpdateOneWithoutChatNestedInput;
}
