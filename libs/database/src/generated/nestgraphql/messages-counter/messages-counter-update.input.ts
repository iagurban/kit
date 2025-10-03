import { Field, InputType } from '@nestjs/graphql';

import { ChatUpdateOneRequiredWithoutMessagesCounterNestedInput } from '../chat/chat-update-one-required-without-messages-counter-nested.input';
import { BigIntFieldUpdateOperationsInput } from '../prisma/big-int-field-update-operations.input';

@InputType()
export class MessagesCounterUpdateInput {
  @Field(() => BigIntFieldUpdateOperationsInput, { nullable: true })
  lastNn?: BigIntFieldUpdateOperationsInput;

  @Field(() => ChatUpdateOneRequiredWithoutMessagesCounterNestedInput, { nullable: true })
  chat?: ChatUpdateOneRequiredWithoutMessagesCounterNestedInput;
}
