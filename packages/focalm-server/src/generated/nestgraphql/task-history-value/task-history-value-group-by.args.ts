import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryValueCountAggregateInput } from './task-history-value-count-aggregate.input';
import { TaskHistoryValueMaxAggregateInput } from './task-history-value-max-aggregate.input';
import { TaskHistoryValueMinAggregateInput } from './task-history-value-min-aggregate.input';
import { TaskHistoryValueOrderByWithAggregationInput } from './task-history-value-order-by-with-aggregation.input';
import { TaskHistoryValueScalarFieldEnum } from './task-history-value-scalar-field.enum';
import { TaskHistoryValueScalarWhereWithAggregatesInput } from './task-history-value-scalar-where-with-aggregates.input';
import { TaskHistoryValueWhereInput } from './task-history-value-where.input';

@ArgsType()
export class TaskHistoryValueGroupByArgs {
  @Field(() => TaskHistoryValueWhereInput, { nullable: true })
  @Type(() => TaskHistoryValueWhereInput)
  where?: TaskHistoryValueWhereInput;

  @Field(() => [TaskHistoryValueOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<TaskHistoryValueOrderByWithAggregationInput>;

  @Field(() => [TaskHistoryValueScalarFieldEnum], { nullable: false })
  by!: Array<`${TaskHistoryValueScalarFieldEnum}`>;

  @Field(() => TaskHistoryValueScalarWhereWithAggregatesInput, { nullable: true })
  having?: TaskHistoryValueScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => TaskHistoryValueCountAggregateInput, { nullable: true })
  _count?: TaskHistoryValueCountAggregateInput;

  @Field(() => TaskHistoryValueMinAggregateInput, { nullable: true })
  _min?: TaskHistoryValueMinAggregateInput;

  @Field(() => TaskHistoryValueMaxAggregateInput, { nullable: true })
  _max?: TaskHistoryValueMaxAggregateInput;
}
