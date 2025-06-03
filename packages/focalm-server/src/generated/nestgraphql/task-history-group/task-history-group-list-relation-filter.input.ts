import { Field, InputType } from '@nestjs/graphql';

import { TaskHistoryGroupWhereInput } from './task-history-group-where.input';

@InputType()
export class TaskHistoryGroupListRelationFilter {
  @Field(() => TaskHistoryGroupWhereInput, { nullable: true })
  every?: TaskHistoryGroupWhereInput;

  @Field(() => TaskHistoryGroupWhereInput, { nullable: true })
  some?: TaskHistoryGroupWhereInput;

  @Field(() => TaskHistoryGroupWhereInput, { nullable: true })
  none?: TaskHistoryGroupWhereInput;
}
