import { Field, InputType } from '@nestjs/graphql';

import { NestedEnumTaskHistoryKeyFilter } from './nested-enum-task-history-key-filter.input';
import { NestedEnumTaskHistoryKeyWithAggregatesFilter } from './nested-enum-task-history-key-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { TaskHistoryKey } from './task-history-key.enum';

@InputType()
export class EnumTaskHistoryKeyWithAggregatesFilter {
  @Field(() => TaskHistoryKey, { nullable: true })
  equals?: `${TaskHistoryKey}`;

  @Field(() => [TaskHistoryKey], { nullable: true })
  in?: Array<`${TaskHistoryKey}`>;

  @Field(() => [TaskHistoryKey], { nullable: true })
  notIn?: Array<`${TaskHistoryKey}`>;

  @Field(() => NestedEnumTaskHistoryKeyWithAggregatesFilter, { nullable: true })
  not?: NestedEnumTaskHistoryKeyWithAggregatesFilter;

  @Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter;

  @Field(() => NestedEnumTaskHistoryKeyFilter, { nullable: true })
  _min?: NestedEnumTaskHistoryKeyFilter;

  @Field(() => NestedEnumTaskHistoryKeyFilter, { nullable: true })
  _max?: NestedEnumTaskHistoryKeyFilter;
}
