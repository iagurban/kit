import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupCountAggregateInput } from './task-history-group-count-aggregate.input';
import { TaskHistoryGroupMaxAggregateInput } from './task-history-group-max-aggregate.input';
import { TaskHistoryGroupMinAggregateInput } from './task-history-group-min-aggregate.input';
import { TaskHistoryGroupOrderByWithRelationInput } from './task-history-group-order-by-with-relation.input';
import { TaskHistoryGroupWhereInput } from './task-history-group-where.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@ArgsType()
export class TaskHistoryGroupAggregateArgs {
  @Field(() => TaskHistoryGroupWhereInput, { nullable: true })
  @Type(() => TaskHistoryGroupWhereInput)
  where?: TaskHistoryGroupWhereInput;

  @Field(() => [TaskHistoryGroupOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TaskHistoryGroupOrderByWithRelationInput>;

  @Field(() => TaskHistoryGroupWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>;

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
