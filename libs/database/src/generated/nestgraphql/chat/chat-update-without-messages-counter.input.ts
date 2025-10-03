import { Field, InputType } from '@nestjs/graphql';

import { ChatEventUpdateManyWithoutChatNestedInput } from '../chat-event/chat-event-update-many-without-chat-nested.input';
import { ChatEventsCounterUpdateOneWithoutChatNestedInput } from '../chat-events-counter/chat-events-counter-update-one-without-chat-nested.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class ChatUpdateWithoutMessagesCounterInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  title?: StringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  bio?: NullableStringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  avatar?: NullableStringFieldUpdateOperationsInput;

  @Field(() => ChatEventUpdateManyWithoutChatNestedInput, { nullable: true })
  events?: ChatEventUpdateManyWithoutChatNestedInput;

  @Field(() => ChatEventsCounterUpdateOneWithoutChatNestedInput, { nullable: true })
  eventsCounter?: ChatEventsCounterUpdateOneWithoutChatNestedInput;
}
