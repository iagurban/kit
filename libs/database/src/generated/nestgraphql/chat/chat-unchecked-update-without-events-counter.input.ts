import { Field, InputType } from '@nestjs/graphql';

import { ChatEventUncheckedUpdateManyWithoutChatNestedInput } from '../chat-event/chat-event-unchecked-update-many-without-chat-nested.input';
import { MessagesCounterUncheckedUpdateOneWithoutChatNestedInput } from '../messages-counter/messages-counter-unchecked-update-one-without-chat-nested.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class ChatUncheckedUpdateWithoutEventsCounterInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  title?: StringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  bio?: NullableStringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  avatar?: NullableStringFieldUpdateOperationsInput;

  @Field(() => ChatEventUncheckedUpdateManyWithoutChatNestedInput, { nullable: true })
  events?: ChatEventUncheckedUpdateManyWithoutChatNestedInput;

  @Field(() => MessagesCounterUncheckedUpdateOneWithoutChatNestedInput, { nullable: true })
  messagesCounter?: MessagesCounterUncheckedUpdateOneWithoutChatNestedInput;
}
