import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TaskToTaskRelationUncheckedUpdateManyWithoutTypeNestedInput } from '../task-to-task-relation/task-to-task-relation-unchecked-update-many-without-type-nested.input';

@InputType()
export class TaskToTaskRelationTypeUncheckedUpdateWithoutProjectInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  forward?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  inverse?: StringFieldUpdateOperationsInput;

  @Field(() => TaskToTaskRelationUncheckedUpdateManyWithoutTypeNestedInput, { nullable: true })
  relations?: TaskToTaskRelationUncheckedUpdateManyWithoutTypeNestedInput;
}
