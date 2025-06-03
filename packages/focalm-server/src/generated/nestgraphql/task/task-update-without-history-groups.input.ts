import { Field, InputType } from '@nestjs/graphql';

import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { EnumTaskStateFieldUpdateOperationsInput } from '../prisma/enum-task-state-field-update-operations.input';
import { FloatFieldUpdateOperationsInput } from '../prisma/float-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserUpdateOneRequiredWithoutAuthoredTasksNestedInput } from '../user/user-update-one-required-without-authored-tasks-nested.input';
import { UserUpdateOneWithoutAssignedTasksNestedInput } from '../user/user-update-one-without-assigned-tasks-nested.input';
import { TaskUpdateManyWithoutParentNestedInput } from './task-update-many-without-parent-nested.input';
import { TaskUpdateOneWithoutChildrenNestedInput } from './task-update-one-without-children-nested.input';

@InputType()
export class TaskUpdateWithoutHistoryGroupsInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  title?: StringFieldUpdateOperationsInput;

  @Field(() => EnumTaskStateFieldUpdateOperationsInput, { nullable: true })
  state?: EnumTaskStateFieldUpdateOperationsInput;

  @Field(() => BoolFieldUpdateOperationsInput, { nullable: true })
  archived?: BoolFieldUpdateOperationsInput;

  @Field(() => FloatFieldUpdateOperationsInput, { nullable: true })
  impact?: FloatFieldUpdateOperationsInput;

  @Field(() => FloatFieldUpdateOperationsInput, { nullable: true })
  ease?: FloatFieldUpdateOperationsInput;

  @Field(() => NullableDateTimeFieldUpdateOperationsInput, { nullable: true })
  startAfter?: NullableDateTimeFieldUpdateOperationsInput;

  @Field(() => NullableDateTimeFieldUpdateOperationsInput, { nullable: true })
  plannedStart?: NullableDateTimeFieldUpdateOperationsInput;

  @Field(() => NullableDateTimeFieldUpdateOperationsInput, { nullable: true })
  dueTo?: NullableDateTimeFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  updatedAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  orderKey?: StringFieldUpdateOperationsInput;

  @Field(() => UserUpdateOneRequiredWithoutAuthoredTasksNestedInput, { nullable: true })
  author?: UserUpdateOneRequiredWithoutAuthoredTasksNestedInput;

  @Field(() => UserUpdateOneWithoutAssignedTasksNestedInput, { nullable: true })
  responsible?: UserUpdateOneWithoutAssignedTasksNestedInput;

  @Field(() => TaskUpdateOneWithoutChildrenNestedInput, { nullable: true })
  parent?: TaskUpdateOneWithoutChildrenNestedInput;

  @Field(() => TaskUpdateManyWithoutParentNestedInput, { nullable: true })
  children?: TaskUpdateManyWithoutParentNestedInput;
}
