import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class TaskToTaskRelationUncheckedUpdateManyWithoutDstInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  srcId?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  typeId?: StringFieldUpdateOperationsInput;
}
