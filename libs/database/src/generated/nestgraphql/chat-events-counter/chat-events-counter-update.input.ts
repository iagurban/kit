import { Field, InputType } from '@nestjs/graphql';

import { ChatUpdateOneRequiredWithoutEventsCounterNestedInput } from '../chat/chat-update-one-required-without-events-counter-nested.input';
import { BigIntFieldUpdateOperationsInput } from '../prisma/big-int-field-update-operations.input';

@InputType()
export class ChatEventsCounterUpdateInput {
  @Field(() => BigIntFieldUpdateOperationsInput, { nullable: true })
  lastNn?: BigIntFieldUpdateOperationsInput;

  @Field(() => ChatUpdateOneRequiredWithoutEventsCounterNestedInput, { nullable: true })
  chat?: ChatUpdateOneRequiredWithoutEventsCounterNestedInput;
}
