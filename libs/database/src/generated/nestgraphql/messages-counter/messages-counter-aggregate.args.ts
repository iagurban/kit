import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MessagesCounterAvgAggregateInput } from './messages-counter-avg-aggregate.input';
import { MessagesCounterCountAggregateInput } from './messages-counter-count-aggregate.input';
import { MessagesCounterMaxAggregateInput } from './messages-counter-max-aggregate.input';
import { MessagesCounterMinAggregateInput } from './messages-counter-min-aggregate.input';
import { MessagesCounterOrderByWithRelationInput } from './messages-counter-order-by-with-relation.input';
import { MessagesCounterSumAggregateInput } from './messages-counter-sum-aggregate.input';
import { MessagesCounterWhereInput } from './messages-counter-where.input';
import { MessagesCounterWhereUniqueInput } from './messages-counter-where-unique.input';

@ArgsType()
export class MessagesCounterAggregateArgs {
  @Field(() => MessagesCounterWhereInput, { nullable: true })
  @Type(() => MessagesCounterWhereInput)
  where?: MessagesCounterWhereInput;

  @Field(() => [MessagesCounterOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<MessagesCounterOrderByWithRelationInput>;

  @Field(() => MessagesCounterWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<MessagesCounterWhereUniqueInput, 'chatId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => MessagesCounterCountAggregateInput, { nullable: true })
  _count?: MessagesCounterCountAggregateInput;

  @Field(() => MessagesCounterAvgAggregateInput, { nullable: true })
  _avg?: MessagesCounterAvgAggregateInput;

  @Field(() => MessagesCounterSumAggregateInput, { nullable: true })
  _sum?: MessagesCounterSumAggregateInput;

  @Field(() => MessagesCounterMinAggregateInput, { nullable: true })
  _min?: MessagesCounterMinAggregateInput;

  @Field(() => MessagesCounterMaxAggregateInput, { nullable: true })
  _max?: MessagesCounterMaxAggregateInput;
}
