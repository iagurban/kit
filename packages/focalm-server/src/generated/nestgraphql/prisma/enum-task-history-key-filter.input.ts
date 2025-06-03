import { Field, InputType } from '@nestjs/graphql';

import { NestedEnumTaskHistoryKeyFilter } from './nested-enum-task-history-key-filter.input';
import { TaskHistoryKey } from './task-history-key.enum';

@InputType()
export class EnumTaskHistoryKeyFilter {
  @Field(() => TaskHistoryKey, { nullable: true })
  equals?: `${TaskHistoryKey}`;

  @Field(() => [TaskHistoryKey], { nullable: true })
  in?: Array<`${TaskHistoryKey}`>;

  @Field(() => [TaskHistoryKey], { nullable: true })
  notIn?: Array<`${TaskHistoryKey}`>;

  @Field(() => NestedEnumTaskHistoryKeyFilter, { nullable: true })
  not?: NestedEnumTaskHistoryKeyFilter;
}
