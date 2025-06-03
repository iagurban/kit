import { Field, InputType } from '@nestjs/graphql';

import { TaskHistoryValueWhereInput } from './task-history-value-where.input';

@InputType()
export class TaskHistoryValueListRelationFilter {
  @Field(() => TaskHistoryValueWhereInput, { nullable: true })
  every?: TaskHistoryValueWhereInput;

  @Field(() => TaskHistoryValueWhereInput, { nullable: true })
  some?: TaskHistoryValueWhereInput;

  @Field(() => TaskHistoryValueWhereInput, { nullable: true })
  none?: TaskHistoryValueWhereInput;
}
