import { Field, InputType } from '@nestjs/graphql';

import { TaskState } from './task-state.enum';

@InputType()
export class NestedEnumTaskStateFilter {
  @Field(() => TaskState, { nullable: true })
  equals?: `${TaskState}`;

  @Field(() => [TaskState], { nullable: true })
  in?: Array<`${TaskState}`>;

  @Field(() => [TaskState], { nullable: true })
  notIn?: Array<`${TaskState}`>;

  @Field(() => NestedEnumTaskStateFilter, { nullable: true })
  not?: NestedEnumTaskStateFilter;
}
