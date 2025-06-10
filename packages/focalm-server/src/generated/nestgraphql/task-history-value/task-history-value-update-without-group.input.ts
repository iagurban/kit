import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { EnumTaskHistoryKeyFieldUpdateOperationsInput } from '../prisma/enum-task-history-key-field-update-operations.input';
import { EnumTaskHistoryOperationFieldUpdateOperationsInput } from '../prisma/enum-task-history-operation-field-update-operations.input';
import { TaskUpdateOneRequiredWithoutHistoryValuesNestedInput } from '../task/task-update-one-required-without-history-values-nested.input';

@InputType()
export class TaskHistoryValueUpdateWithoutGroupInput {
  @Field(() => EnumTaskHistoryKeyFieldUpdateOperationsInput, { nullable: true })
  key?: EnumTaskHistoryKeyFieldUpdateOperationsInput;

  @Field(() => EnumTaskHistoryOperationFieldUpdateOperationsInput, { nullable: true })
  op?: EnumTaskHistoryOperationFieldUpdateOperationsInput;

  @Field(() => GraphQLJSON, { nullable: true })
  value?: any;

  @Field(() => TaskUpdateOneRequiredWithoutHistoryValuesNestedInput, { nullable: true })
  task?: TaskUpdateOneRequiredWithoutHistoryValuesNestedInput;
}
