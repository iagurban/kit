import { Field, InputType } from '@nestjs/graphql';

import { BigIntFieldUpdateOperationsInput } from '../prisma/big-int-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TaskUpdateManyWithoutProjectNestedInput } from '../task/task-update-many-without-project-nested.input';
import { TaskToTaskRelationTypeUpdateManyWithoutProjectNestedInput } from '../task-to-task-relation-type/task-to-task-relation-type-update-many-without-project-nested.input';
import { UserUpdateOneWithoutOwnProjectNestedInput } from '../user/user-update-one-without-own-project-nested.input';

@InputType()
export class ProjectUpdateWithoutUsersPermissionsInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => BigIntFieldUpdateOperationsInput, { nullable: true })
  tasksCounter?: BigIntFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  abbrev?: NullableStringFieldUpdateOperationsInput;

  @Field(() => UserUpdateOneWithoutOwnProjectNestedInput, { nullable: true })
  ownOf?: UserUpdateOneWithoutOwnProjectNestedInput;

  @Field(() => TaskToTaskRelationTypeUpdateManyWithoutProjectNestedInput, { nullable: true })
  relationTypes?: TaskToTaskRelationTypeUpdateManyWithoutProjectNestedInput;

  @Field(() => TaskUpdateManyWithoutProjectNestedInput, { nullable: true })
  tasks?: TaskUpdateManyWithoutProjectNestedInput;
}
