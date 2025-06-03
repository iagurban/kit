import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueCountAggregateInput } from './task-history-value-count-aggregate.input';
import { TaskHistoryValueMaxAggregateInput } from './task-history-value-max-aggregate.input';
import { TaskHistoryValueMinAggregateInput } from './task-history-value-min-aggregate.input';
import { TaskHistoryValueOrderByWithRelationInput } from './task-history-value-order-by-with-relation.input';
import { TaskHistoryValueWhereInput } from './task-history-value-where.input';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@ArgsType()
export class TaskHistoryValueAggregateArgs {
  @Field(() => TaskHistoryValueWhereInput, { nullable: true })
  @Type(() => TaskHistoryValueWhereInput)
  where?: TaskHistoryValueWhereInput;

  @Field(() => [TaskHistoryValueOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<TaskHistoryValueOrderByWithRelationInput>;

  @Field(() => TaskHistoryValueWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'groupId_key'>;

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
