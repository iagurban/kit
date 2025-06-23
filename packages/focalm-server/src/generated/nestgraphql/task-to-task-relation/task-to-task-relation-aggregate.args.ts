import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationCountAggregateInput } from './task-to-task-relation-count-aggregate.input';
import { TaskToTaskRelationMaxAggregateInput } from './task-to-task-relation-max-aggregate.input';
import { TaskToTaskRelationMinAggregateInput } from './task-to-task-relation-min-aggregate.input';
import { TaskToTaskRelationOrderByWithRelationInput } from './task-to-task-relation-order-by-with-relation.input';
import { TaskToTaskRelationWhereInput } from './task-to-task-relation-where.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@ArgsType()
export class TaskToTaskRelationAggregateArgs {
  @Field(() => TaskToTaskRelationWhereInput, { nullable: true })
  @Type(() => TaskToTaskRelationWhereInput)
  where?: TaskToTaskRelationWhereInput;

  @Field(() => [TaskToTaskRelationOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TaskToTaskRelationOrderByWithRelationInput>;

  @Field(() => TaskToTaskRelationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>;

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
