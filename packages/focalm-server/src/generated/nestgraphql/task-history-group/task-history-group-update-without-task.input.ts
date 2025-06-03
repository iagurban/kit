import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput } from '../prisma/nullable-enum-created-at-fix-reason-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TaskHistoryValueUpdateManyWithoutGroupNestedInput } from '../task-history-value/task-history-value-update-many-without-group-nested.input';
import { UserUpdateOneRequiredWithoutAuthoredTaskChangesNestedInput } from '../user/user-update-one-required-without-authored-task-changes-nested.input';

@InputType()
export class TaskHistoryGroupUpdateWithoutTaskInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  localCreatedAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput, { nullable: true })
  createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput;

  @Field(() => TaskHistoryValueUpdateManyWithoutGroupNestedInput, { nullable: true })
  values?: TaskHistoryValueUpdateManyWithoutGroupNestedInput;

  @Field(() => UserUpdateOneRequiredWithoutAuthoredTaskChangesNestedInput, { nullable: true })
  author?: UserUpdateOneRequiredWithoutAuthoredTaskChangesNestedInput;
}
