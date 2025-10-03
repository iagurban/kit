import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventsCounterAvgAggregateInput } from './chat-events-counter-avg-aggregate.input';
import { ChatEventsCounterCountAggregateInput } from './chat-events-counter-count-aggregate.input';
import { ChatEventsCounterMaxAggregateInput } from './chat-events-counter-max-aggregate.input';
import { ChatEventsCounterMinAggregateInput } from './chat-events-counter-min-aggregate.input';
import { ChatEventsCounterOrderByWithAggregationInput } from './chat-events-counter-order-by-with-aggregation.input';
import { ChatEventsCounterScalarFieldEnum } from './chat-events-counter-scalar-field.enum';
import { ChatEventsCounterScalarWhereWithAggregatesInput } from './chat-events-counter-scalar-where-with-aggregates.input';
import { ChatEventsCounterSumAggregateInput } from './chat-events-counter-sum-aggregate.input';
import { ChatEventsCounterWhereInput } from './chat-events-counter-where.input';

@ArgsType()
export class ChatEventsCounterGroupByArgs {
  @Field(() => ChatEventsCounterWhereInput, { nullable: true })
  @Type(() => ChatEventsCounterWhereInput)
  where?: ChatEventsCounterWhereInput;

  @Field(() => [ChatEventsCounterOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<ChatEventsCounterOrderByWithAggregationInput>;

  @Field(() => [ChatEventsCounterScalarFieldEnum], { nullable: false })
  by!: Array<`${ChatEventsCounterScalarFieldEnum}`>;

  @Field(() => ChatEventsCounterScalarWhereWithAggregatesInput, { nullable: true })
  having?: ChatEventsCounterScalarWhereWithAggregatesInput;

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
