import { Field, InputType } from '@nestjs/graphql';

import { NestedEnumTaskStateFilter } from './nested-enum-task-state-filter.input';
import { NestedEnumTaskStateWithAggregatesFilter } from './nested-enum-task-state-with-aggregates-filter.input';
import { NestedIntFilter } from './nested-int-filter.input';
import { TaskState } from './task-state.enum';

@InputType()
export class EnumTaskStateWithAggregatesFilter {
  @Field(() => TaskState, { nullable: true })
  equals?: `${TaskState}`;

  @Field(() => [TaskState], { nullable: true })
  in?: Array<`${TaskState}`>;

  @Field(() => [TaskState], { nullable: true })
  notIn?: Array<`${TaskState}`>;

  @Field(() => NestedEnumTaskStateWithAggregatesFilter, { nullable: true })
  not?: NestedEnumTaskStateWithAggregatesFilter;

  @Field(() => NestedIntFilter, { nullable: true })
  _count?: NestedIntFilter;

  @Field(() => NestedEnumTaskStateFilter, { nullable: true })
  _min?: NestedEnumTaskStateFilter;

  @Field(() => NestedEnumTaskStateFilter, { nullable: true })
  _max?: NestedEnumTaskStateFilter;
}
