import { Field, InputType } from '@nestjs/graphql';

import { BigIntFieldUpdateOperationsInput } from '../prisma/big-int-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TaskToTaskRelationTypeUpdateManyWithoutProjectNestedInput } from '../task-to-task-relation-type/task-to-task-relation-type-update-many-without-project-nested.input';
import { UserUpdateOneWithoutOwnProjectNestedInput } from '../user/user-update-one-without-own-project-nested.input';
import { UserInProjectUpdateManyWithoutProjectNestedInput } from '../user-in-project/user-in-project-update-many-without-project-nested.input';

@InputType()
export class ProjectUpdateWithoutTasksInput {
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

  @Field(() => UserInProjectUpdateManyWithoutProjectNestedInput, { nullable: true })
  usersPermissions?: UserInProjectUpdateManyWithoutProjectNestedInput;
}
