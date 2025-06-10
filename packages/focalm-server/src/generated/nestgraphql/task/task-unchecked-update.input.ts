import { Field, InputType } from '@nestjs/graphql';

import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { EnumTaskStateFieldUpdateOperationsInput } from '../prisma/enum-task-state-field-update-operations.input';
import { FloatFieldUpdateOperationsInput } from '../prisma/float-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TaskHistoryValueUncheckedUpdateManyWithoutTaskNestedInput } from '../task-history-value/task-history-value-unchecked-update-many-without-task-nested.input';
import { UserInTaskUncheckedUpdateManyWithoutTaskNestedInput } from '../user-in-task/user-in-task-unchecked-update-many-without-task-nested.input';
import { TaskUncheckedUpdateManyWithoutParentNestedInput } from './task-unchecked-update-many-without-parent-nested.input';

@InputType()
export class TaskUncheckedUpdateInput {
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

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  authorId?: StringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  responsibleId?: NullableStringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  parentId?: NullableStringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  orderKey?: StringFieldUpdateOperationsInput;

  @Field(() => TaskUncheckedUpdateManyWithoutParentNestedInput, { nullable: true })
  children?: TaskUncheckedUpdateManyWithoutParentNestedInput;

  @Field(() => UserInTaskUncheckedUpdateManyWithoutTaskNestedInput, { nullable: true })
  participants?: UserInTaskUncheckedUpdateManyWithoutTaskNestedInput;

  @Field(() => TaskHistoryValueUncheckedUpdateManyWithoutTaskNestedInput, { nullable: true })
  historyValues?: TaskHistoryValueUncheckedUpdateManyWithoutTaskNestedInput;
}
