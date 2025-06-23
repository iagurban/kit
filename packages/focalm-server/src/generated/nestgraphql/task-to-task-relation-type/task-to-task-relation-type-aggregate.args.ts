import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationTypeCountAggregateInput } from './task-to-task-relation-type-count-aggregate.input';
import { TaskToTaskRelationTypeMaxAggregateInput } from './task-to-task-relation-type-max-aggregate.input';
import { TaskToTaskRelationTypeMinAggregateInput } from './task-to-task-relation-type-min-aggregate.input';
import { TaskToTaskRelationTypeOrderByWithRelationInput } from './task-to-task-relation-type-order-by-with-relation.input';
import { TaskToTaskRelationTypeWhereInput } from './task-to-task-relation-type-where.input';
import { TaskToTaskRelationTypeWhereUniqueInput } from './task-to-task-relation-type-where-unique.input';

@ArgsType()
export class TaskToTaskRelationTypeAggregateArgs {
  @Field(() => TaskToTaskRelationTypeWhereInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeWhereInput)
  where?: TaskToTaskRelationTypeWhereInput;

  @Field(() => [TaskToTaskRelationTypeOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TaskToTaskRelationTypeOrderByWithRelationInput>;

  @Field(() => TaskToTaskRelationTypeWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<TaskToTaskRelationTypeWhereUniqueInput, 'id'>;

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
