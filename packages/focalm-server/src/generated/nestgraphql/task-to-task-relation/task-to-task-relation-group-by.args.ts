import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationCountAggregateInput } from './task-to-task-relation-count-aggregate.input';
import { TaskToTaskRelationMaxAggregateInput } from './task-to-task-relation-max-aggregate.input';
import { TaskToTaskRelationMinAggregateInput } from './task-to-task-relation-min-aggregate.input';
import { TaskToTaskRelationOrderByWithAggregationInput } from './task-to-task-relation-order-by-with-aggregation.input';
import { TaskToTaskRelationScalarFieldEnum } from './task-to-task-relation-scalar-field.enum';
import { TaskToTaskRelationScalarWhereWithAggregatesInput } from './task-to-task-relation-scalar-where-with-aggregates.input';
import { TaskToTaskRelationWhereInput } from './task-to-task-relation-where.input';

@ArgsType()
export class TaskToTaskRelationGroupByArgs {
  @Field(() => TaskToTaskRelationWhereInput, { nullable: true })
  @Type(() => TaskToTaskRelationWhereInput)
  where?: TaskToTaskRelationWhereInput;

  @Field(() => [TaskToTaskRelationOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<TaskToTaskRelationOrderByWithAggregationInput>;

  @Field(() => [TaskToTaskRelationScalarFieldEnum], { nullable: false })
  by!: Array<`${TaskToTaskRelationScalarFieldEnum}`>;

  @Field(() => TaskToTaskRelationScalarWhereWithAggregatesInput, { nullable: true })
  having?: TaskToTaskRelationScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => TaskToTaskRelationCountAggregateInput, { nullable: true })
  _count?: TaskToTaskRelationCountAggregateInput;

  @Field(() => TaskToTaskRelationMinAggregateInput, { nullable: true })
  _min?: TaskToTaskRelationMinAggregateInput;

  @Field(() => TaskToTaskRelationMaxAggregateInput, { nullable: true })
  _max?: TaskToTaskRelationMaxAggregateInput;
}
