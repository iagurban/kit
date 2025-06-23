import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class TaskToTaskRelationUncheckedUpdateManyWithoutSrcInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  dstId?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  typeId?: StringFieldUpdateOperationsInput;
}
