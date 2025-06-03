import { Field, InputType } from '@nestjs/graphql';

import { TaskHistoryGroupWhereInput } from './task-history-group-where.input';

@InputType()
export class TaskHistoryGroupScalarRelationFilter {
  @Field(() => TaskHistoryGroupWhereInput, { nullable: true })
  is?: TaskHistoryGroupWhereInput;

  @Field(() => TaskHistoryGroupWhereInput, { nullable: true })
  isNot?: TaskHistoryGroupWhereInput;
}
