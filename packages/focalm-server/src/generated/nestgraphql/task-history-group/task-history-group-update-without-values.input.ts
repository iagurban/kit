import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput } from '../prisma/nullable-enum-created-at-fix-reason-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TaskUpdateOneRequiredWithoutHistoryGroupsNestedInput } from '../task/task-update-one-required-without-history-groups-nested.input';
import { UserUpdateOneRequiredWithoutAuthoredTaskChangesNestedInput } from '../user/user-update-one-required-without-authored-task-changes-nested.input';

@InputType()
export class TaskHistoryGroupUpdateWithoutValuesInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  localCreatedAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput, { nullable: true })
  createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput;

  @Field(() => TaskUpdateOneRequiredWithoutHistoryGroupsNestedInput, { nullable: true })
  task?: TaskUpdateOneRequiredWithoutHistoryGroupsNestedInput;

  @Field(() => UserUpdateOneRequiredWithoutAuthoredTaskChangesNestedInput, { nullable: true })
  author?: UserUpdateOneRequiredWithoutAuthoredTaskChangesNestedInput;
}
