import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { EnumTaskHistoryKeyFieldUpdateOperationsInput } from '../prisma/enum-task-history-key-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TaskHistoryGroupUpdateOneRequiredWithoutValuesNestedInput } from '../task-history-group/task-history-group-update-one-required-without-values-nested.input';

@InputType()
export class TaskHistoryValueUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  taskId?: StringFieldUpdateOperationsInput;

  @Field(() => EnumTaskHistoryKeyFieldUpdateOperationsInput, { nullable: true })
  key?: EnumTaskHistoryKeyFieldUpdateOperationsInput;

  @Field(() => GraphQLJSON, { nullable: true })
  value?: any;

  @Field(() => TaskHistoryGroupUpdateOneRequiredWithoutValuesNestedInput, { nullable: true })
  group?: TaskHistoryGroupUpdateOneRequiredWithoutValuesNestedInput;
}
