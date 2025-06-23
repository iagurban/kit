import { Field, InputType } from '@nestjs/graphql';

import { BigIntFieldUpdateOperationsInput } from '../prisma/big-int-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TaskToTaskRelationTypeUncheckedUpdateManyWithoutProjectNestedInput } from '../task-to-task-relation-type/task-to-task-relation-type-unchecked-update-many-without-project-nested.input';
import { UserUncheckedUpdateOneWithoutOwnProjectNestedInput } from '../user/user-unchecked-update-one-without-own-project-nested.input';
import { UserInProjectUncheckedUpdateManyWithoutProjectNestedInput } from '../user-in-project/user-in-project-unchecked-update-many-without-project-nested.input';

@InputType()
export class ProjectUncheckedUpdateWithoutTasksInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => BigIntFieldUpdateOperationsInput, { nullable: true })
  tasksCounter?: BigIntFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  abbrev?: NullableStringFieldUpdateOperationsInput;

  @Field(() => UserUncheckedUpdateOneWithoutOwnProjectNestedInput, { nullable: true })
  ownOf?: UserUncheckedUpdateOneWithoutOwnProjectNestedInput;

  @Field(() => TaskToTaskRelationTypeUncheckedUpdateManyWithoutProjectNestedInput, { nullable: true })
  relationTypes?: TaskToTaskRelationTypeUncheckedUpdateManyWithoutProjectNestedInput;

  @Field(() => UserInProjectUncheckedUpdateManyWithoutProjectNestedInput, { nullable: true })
  usersPermissions?: UserInProjectUncheckedUpdateManyWithoutProjectNestedInput;
}
