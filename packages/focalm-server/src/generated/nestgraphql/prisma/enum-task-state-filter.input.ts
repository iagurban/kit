import { Field, InputType } from '@nestjs/graphql';

import { NestedEnumTaskStateFilter } from './nested-enum-task-state-filter.input';
import { TaskState } from './task-state.enum';

@InputType()
export class EnumTaskStateFilter {
  @Field(() => TaskState, { nullable: true })
  equals?: `${TaskState}`;

  @Field(() => [TaskState], { nullable: true })
  in?: Array<`${TaskState}`>;

  @Field(() => [TaskState], { nullable: true })
  notIn?: Array<`${TaskState}`>;

  @Field(() => NestedEnumTaskStateFilter, { nullable: true })
  not?: NestedEnumTaskStateFilter;
}
