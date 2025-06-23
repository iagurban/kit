import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationTypeCountAggregateInput } from './task-to-task-relation-type-count-aggregate.input';
import { TaskToTaskRelationTypeMaxAggregateInput } from './task-to-task-relation-type-max-aggregate.input';
import { TaskToTaskRelationTypeMinAggregateInput } from './task-to-task-relation-type-min-aggregate.input';
import { TaskToTaskRelationTypeOrderByWithAggregationInput } from './task-to-task-relation-type-order-by-with-aggregation.input';
import { TaskToTaskRelationTypeScalarFieldEnum } from './task-to-task-relation-type-scalar-field.enum';
import { TaskToTaskRelationTypeScalarWhereWithAggregatesInput } from './task-to-task-relation-type-scalar-where-with-aggregates.input';
import { TaskToTaskRelationTypeWhereInput } from './task-to-task-relation-type-where.input';

@ArgsType()
export class TaskToTaskRelationTypeGroupByArgs {
  @Field(() => TaskToTaskRelationTypeWhereInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeWhereInput)
  where?: TaskToTaskRelationTypeWhereInput;

  @Field(() => [TaskToTaskRelationTypeOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<TaskToTaskRelationTypeOrderByWithAggregationInput>;

  @Field(() => [TaskToTaskRelationTypeScalarFieldEnum], { nullable: false })
  by!: Array<`${TaskToTaskRelationTypeScalarFieldEnum}`>;

  @Field(() => TaskToTaskRelationTypeScalarWhereWithAggregatesInput, { nullable: true })
  having?: TaskToTaskRelationTypeScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => TaskToTaskRelationTypeCountAggregateInput, { nullable: true })
  _count?: TaskToTaskRelationTypeCountAggregateInput;

  @Field(() => TaskToTaskRelationTypeMinAggregateInput, { nullable: true })
  _min?: TaskToTaskRelationTypeMinAggregateInput;

  @Field(() => TaskToTaskRelationTypeMaxAggregateInput, { nullable: true })
  _max?: TaskToTaskRelationTypeMaxAggregateInput;
}
