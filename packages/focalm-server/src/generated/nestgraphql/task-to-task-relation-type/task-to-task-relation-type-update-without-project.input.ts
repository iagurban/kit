import { Field, InputType } from '@nestjs/graphql';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TaskToTaskRelationUpdateManyWithoutTypeNestedInput } from '../task-to-task-relation/task-to-task-relation-update-many-without-type-nested.input';

@InputType()
export class TaskToTaskRelationTypeUpdateWithoutProjectInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  forward?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  inverse?: StringFieldUpdateOperationsInput;

  @Field(() => TaskToTaskRelationUpdateManyWithoutTypeNestedInput, { nullable: true })
  relations?: TaskToTaskRelationUpdateManyWithoutTypeNestedInput;
}
