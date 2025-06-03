import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryGroupCountAggregateInput } from './task-history-group-count-aggregate.input';
import { TaskHistoryGroupMaxAggregateInput } from './task-history-group-max-aggregate.input';
import { TaskHistoryGroupMinAggregateInput } from './task-history-group-min-aggregate.input';
import { TaskHistoryGroupOrderByWithAggregationInput } from './task-history-group-order-by-with-aggregation.input';
import { TaskHistoryGroupScalarFieldEnum } from './task-history-group-scalar-field.enum';
import { TaskHistoryGroupScalarWhereWithAggregatesInput } from './task-history-group-scalar-where-with-aggregates.input';
import { TaskHistoryGroupWhereInput } from './task-history-group-where.input';

@ArgsType()
export class TaskHistoryGroupGroupByArgs {
  @Field(() => TaskHistoryGroupWhereInput, { nullable: true })
  @Type(() => TaskHistoryGroupWhereInput)
  where?: TaskHistoryGroupWhereInput;

  @Field(() => [TaskHistoryGroupOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<TaskHistoryGroupOrderByWithAggregationInput>;

  @Field(() => [TaskHistoryGroupScalarFieldEnum], { nullable: false })
  by!: Array<`${TaskHistoryGroupScalarFieldEnum}`>;

  @Field(() => TaskHistoryGroupScalarWhereWithAggregatesInput, { nullable: true })
  having?: TaskHistoryGroupScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => TaskHistoryGroupCountAggregateInput, { nullable: true })
  _count?: TaskHistoryGroupCountAggregateInput;

  @Field(() => TaskHistoryGroupMinAggregateInput, { nullable: true })
  _min?: TaskHistoryGroupMinAggregateInput;

  @Field(() => TaskHistoryGroupMaxAggregateInput, { nullable: true })
  _max?: TaskHistoryGroupMaxAggregateInput;
}
