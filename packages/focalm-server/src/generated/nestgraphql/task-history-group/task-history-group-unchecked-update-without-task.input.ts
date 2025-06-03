import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput } from '../prisma/nullable-enum-created-at-fix-reason-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TaskHistoryValueUncheckedUpdateManyWithoutGroupNestedInput } from '../task-history-value/task-history-value-unchecked-update-many-without-group-nested.input';

@InputType()
export class TaskHistoryGroupUncheckedUpdateWithoutTaskInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  authorId?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  localCreatedAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput, { nullable: true })
  createdAtFixReason?: NullableEnumCreatedAtFixReasonFieldUpdateOperationsInput;

  @Field(() => TaskHistoryValueUncheckedUpdateManyWithoutGroupNestedInput, { nullable: true })
  values?: TaskHistoryValueUncheckedUpdateManyWithoutGroupNestedInput;
}
