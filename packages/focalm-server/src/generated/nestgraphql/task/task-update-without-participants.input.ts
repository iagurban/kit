import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { BigIntFieldUpdateOperationsInput } from '../prisma/big-int-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { EnumTaskStateFieldUpdateOperationsInput } from '../prisma/enum-task-state-field-update-operations.input';
import { FloatFieldUpdateOperationsInput } from '../prisma/float-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { ProjectUpdateOneRequiredWithoutTasksNestedInput } from '../project/project-update-one-required-without-tasks-nested.input';
import { TaskHistoryValueUpdateManyWithoutTaskNestedInput } from '../task-history-value/task-history-value-update-many-without-task-nested.input';
import { TaskToTaskRelationUpdateManyWithoutDstNestedInput } from '../task-to-task-relation/task-to-task-relation-update-many-without-dst-nested.input';
import { TaskToTaskRelationUpdateManyWithoutSrcNestedInput } from '../task-to-task-relation/task-to-task-relation-update-many-without-src-nested.input';
import { UserUpdateOneRequiredWithoutAuthoredTasksNestedInput } from '../user/user-update-one-required-without-authored-tasks-nested.input';
import { UserUpdateOneWithoutAssignedTasksNestedInput } from '../user/user-update-one-without-assigned-tasks-nested.input';
import { TaskUpdateManyWithoutParentNestedInput } from './task-update-many-without-parent-nested.input';
import { TaskUpdateOneWithoutChildrenNestedInput } from './task-update-one-without-children-nested.input';

@InputType()
export class TaskUpdateWithoutParticipantsInput {
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
  startAfterDate?: NullableDateTimeFieldUpdateOperationsInput;

  @Field(() => NullableIntFieldUpdateOperationsInput, { nullable: true })
  startAfterOffset?: NullableIntFieldUpdateOperationsInput;

  @Field(() => NullableDateTimeFieldUpdateOperationsInput, { nullable: true })
  plannedStartDate?: NullableDateTimeFieldUpdateOperationsInput;

  @Field(() => NullableIntFieldUpdateOperationsInput, { nullable: true })
  plannedStartOffset?: NullableIntFieldUpdateOperationsInput;

  @Field(() => NullableDateTimeFieldUpdateOperationsInput, { nullable: true })
  dueToDate?: NullableDateTimeFieldUpdateOperationsInput;

  @Field(() => NullableIntFieldUpdateOperationsInput, { nullable: true })
  dueToOffset?: NullableIntFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  updatedAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => GraphQLJSON, { nullable: true })
  description?: any;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  orderKey?: StringFieldUpdateOperationsInput;

  @Field(() => BigIntFieldUpdateOperationsInput, { nullable: true })
  nnInProject?: BigIntFieldUpdateOperationsInput;

  @Field(() => UserUpdateOneRequiredWithoutAuthoredTasksNestedInput, { nullable: true })
  author?: UserUpdateOneRequiredWithoutAuthoredTasksNestedInput;

  @Field(() => UserUpdateOneWithoutAssignedTasksNestedInput, { nullable: true })
  responsible?: UserUpdateOneWithoutAssignedTasksNestedInput;

  @Field(() => TaskUpdateOneWithoutChildrenNestedInput, { nullable: true })
  parent?: TaskUpdateOneWithoutChildrenNestedInput;

  @Field(() => TaskUpdateManyWithoutParentNestedInput, { nullable: true })
  children?: TaskUpdateManyWithoutParentNestedInput;

  @Field(() => TaskHistoryValueUpdateManyWithoutTaskNestedInput, { nullable: true })
  historyValues?: TaskHistoryValueUpdateManyWithoutTaskNestedInput;

  @Field(() => TaskToTaskRelationUpdateManyWithoutSrcNestedInput, { nullable: true })
  relationsSrc?: TaskToTaskRelationUpdateManyWithoutSrcNestedInput;

  @Field(() => TaskToTaskRelationUpdateManyWithoutDstNestedInput, { nullable: true })
  relationsDst?: TaskToTaskRelationUpdateManyWithoutDstNestedInput;

  @Field(() => ProjectUpdateOneRequiredWithoutTasksNestedInput, { nullable: true })
  project?: ProjectUpdateOneRequiredWithoutTasksNestedInput;
}
