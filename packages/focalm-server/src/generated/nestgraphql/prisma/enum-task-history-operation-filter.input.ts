import { Field, InputType } from '@nestjs/graphql';

import { NestedEnumTaskHistoryOperationFilter } from './nested-enum-task-history-operation-filter.input';
import { TaskHistoryOperation } from './task-history-operation.enum';

@InputType()
export class EnumTaskHistoryOperationFilter {
  @Field(() => TaskHistoryOperation, { nullable: true })
  equals?: `${TaskHistoryOperation}`;

  @Field(() => [TaskHistoryOperation], { nullable: true })
  in?: Array<`${TaskHistoryOperation}`>;

  @Field(() => [TaskHistoryOperation], { nullable: true })
  notIn?: Array<`${TaskHistoryOperation}`>;

  @Field(() => NestedEnumTaskHistoryOperationFilter, { nullable: true })
  not?: NestedEnumTaskHistoryOperationFilter;
}
