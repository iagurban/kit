import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MessagesCounterAvgAggregateInput } from './messages-counter-avg-aggregate.input';
import { MessagesCounterCountAggregateInput } from './messages-counter-count-aggregate.input';
import { MessagesCounterMaxAggregateInput } from './messages-counter-max-aggregate.input';
import { MessagesCounterMinAggregateInput } from './messages-counter-min-aggregate.input';
import { MessagesCounterOrderByWithAggregationInput } from './messages-counter-order-by-with-aggregation.input';
import { MessagesCounterScalarFieldEnum } from './messages-counter-scalar-field.enum';
import { MessagesCounterScalarWhereWithAggregatesInput } from './messages-counter-scalar-where-with-aggregates.input';
import { MessagesCounterSumAggregateInput } from './messages-counter-sum-aggregate.input';
import { MessagesCounterWhereInput } from './messages-counter-where.input';

@ArgsType()
export class MessagesCounterGroupByArgs {
  @Field(() => MessagesCounterWhereInput, { nullable: true })
  @Type(() => MessagesCounterWhereInput)
  where?: MessagesCounterWhereInput;

  @Field(() => [MessagesCounterOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<MessagesCounterOrderByWithAggregationInput>;

  @Field(() => [MessagesCounterScalarFieldEnum], { nullable: false })
  by!: Array<`${MessagesCounterScalarFieldEnum}`>;

  @Field(() => MessagesCounterScalarWhereWithAggregatesInput, { nullable: true })
  having?: MessagesCounterScalarWhereWithAggregatesInput;

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
