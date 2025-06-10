import { Field, InputType } from '@nestjs/graphql';

import { NestedEnumTaskHistoryOperationFilter } from './nested-enum-task-history-operation-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { TaskHistoryOperation } from './task-history-operation.enum';

@InputType()
export class NestedEnumTaskHistoryOperationWithAggregatesFilter {
  @Field(() => TaskHistoryOperation, { nullable: true })
  equals?: `${TaskHistoryOperation}`;

  @Field(() => [TaskHistoryOperation], { nullable: true })
  in?: Array<`${TaskHistoryOperation}`>;

  @Field(() => [TaskHistoryOperation], { nullable: true })
  notIn?: Array<`${TaskHistoryOperation}`>;

  @Field(() => NestedEnumTaskHistoryOperationWithAggregatesFilter, { nullable: true })
  not?: NestedEnumTaskHistoryOperationWithAggregatesFilter;

  @Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter;

  @Field(() => NestedEnumTaskHistoryOperationFilter, { nullable: true })
  _min?: NestedEnumTaskHistoryOperationFilter;

  @Field(() => NestedEnumTaskHistoryOperationFilter, { nullable: true })
  _max?: NestedEnumTaskHistoryOperationFilter;
}
