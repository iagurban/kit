import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class TaskToTaskRelationUncheckedUpdateWithoutTypeInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  srcId?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  dstId?: StringFieldUpdateOperationsInput;
}
