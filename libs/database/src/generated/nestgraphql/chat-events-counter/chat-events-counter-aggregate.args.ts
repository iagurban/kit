import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatEventsCounterAvgAggregateInput } from './chat-events-counter-avg-aggregate.input';
import { ChatEventsCounterCountAggregateInput } from './chat-events-counter-count-aggregate.input';
import { ChatEventsCounterMaxAggregateInput } from './chat-events-counter-max-aggregate.input';
import { ChatEventsCounterMinAggregateInput } from './chat-events-counter-min-aggregate.input';
import { ChatEventsCounterOrderByWithRelationInput } from './chat-events-counter-order-by-with-relation.input';
import { ChatEventsCounterSumAggregateInput } from './chat-events-counter-sum-aggregate.input';
import { ChatEventsCounterWhereInput } from './chat-events-counter-where.input';
import { ChatEventsCounterWhereUniqueInput } from './chat-events-counter-where-unique.input';

@ArgsType()
export class ChatEventsCounterAggregateArgs {
  @Field(() => ChatEventsCounterWhereInput, { nullable: true })
  @Type(() => ChatEventsCounterWhereInput)
  where?: ChatEventsCounterWhereInput;

  @Field(() => [ChatEventsCounterOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ChatEventsCounterOrderByWithRelationInput>;

  @Field(() => ChatEventsCounterWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ChatEventsCounterWhereUniqueInput, 'chatId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => ChatEventsCounterCountAggregateInput, { nullable: true })
  _count?: ChatEventsCounterCountAggregateInput;

  @Field(() => ChatEventsCounterAvgAggregateInput, { nullable: true })
  _avg?: ChatEventsCounterAvgAggregateInput;

  @Field(() => ChatEventsCounterSumAggregateInput, { nullable: true })
  _sum?: ChatEventsCounterSumAggregateInput;

  @Field(() => ChatEventsCounterMinAggregateInput, { nullable: true })
  _min?: ChatEventsCounterMinAggregateInput;

  @Field(() => ChatEventsCounterMaxAggregateInput, { nullable: true })
  _max?: ChatEventsCounterMaxAggregateInput;
}
