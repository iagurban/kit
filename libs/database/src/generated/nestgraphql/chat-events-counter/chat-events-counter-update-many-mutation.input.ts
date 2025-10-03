import { Field, InputType } from '@nestjs/graphql';

import { BigIntFieldUpdateOperationsInput } from '../prisma/big-int-field-update-operations.input';

@InputType()
export class ChatEventsCounterUpdateManyMutationInput {
  @Field(() => BigIntFieldUpdateOperationsInput, { nullable: true })
  lastNn?: BigIntFieldUpdateOperationsInput;
}
