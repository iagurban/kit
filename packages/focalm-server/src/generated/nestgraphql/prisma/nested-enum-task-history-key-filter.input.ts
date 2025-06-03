import { Field, InputType } from '@nestjs/graphql';

import { TaskHistoryKey } from './task-history-key.enum';

@InputType()
export class NestedEnumTaskHistoryKeyFilter {
  @Field(() => TaskHistoryKey, { nullable: true })
  equals?: `${TaskHistoryKey}`;

  @Field(() => [TaskHistoryKey], { nullable: true })
  in?: Array<`${TaskHistoryKey}`>;

  @Field(() => [TaskHistoryKey], { nullable: true })
  notIn?: Array<`${TaskHistoryKey}`>;

  @Field(() => NestedEnumTaskHistoryKeyFilter, { nullable: true })
  not?: NestedEnumTaskHistoryKeyFilter;
}
