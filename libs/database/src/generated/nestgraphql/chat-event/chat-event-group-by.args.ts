import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventAvgAggregateInput } from './chat-event-avg-aggregate.input';
import { ChatEventCountAggregateInput } from './chat-event-count-aggregate.input';
import { ChatEventMaxAggregateInput } from './chat-event-max-aggregate.input';
import { ChatEventMinAggregateInput } from './chat-event-min-aggregate.input';
import { ChatEventOrderByWithAggregationInput } from './chat-event-order-by-with-aggregation.input';
import { ChatEventScalarFieldEnum } from './chat-event-scalar-field.enum';
import { ChatEventScalarWhereWithAggregatesInput } from './chat-event-scalar-where-with-aggregates.input';
import { ChatEventSumAggregateInput } from './chat-event-sum-aggregate.input';
import { ChatEventWhereInput } from './chat-event-where.input';

@ArgsType()
export class ChatEventGroupByArgs {
  @Field(() => ChatEventWhereInput, { nullable: true })
  @Type(() => ChatEventWhereInput)
  where?: ChatEventWhereInput;

  @Field(() => [ChatEventOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<ChatEventOrderByWithAggregationInput>;

  @Field(() => [ChatEventScalarFieldEnum], { nullable: false })
  by!: Array<`${ChatEventScalarFieldEnum}`>;

  @Field(() => ChatEventScalarWhereWithAggregatesInput, { nullable: true })
  having?: ChatEventScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => ChatEventCountAggregateInput, { nullable: true })
  _count?: ChatEventCountAggregateInput;

  @Field(() => ChatEventAvgAggregateInput, { nullable: true })
  _avg?: ChatEventAvgAggregateInput;

  @Field(() => ChatEventSumAggregateInput, { nullable: true })
  _sum?: ChatEventSumAggregateInput;

  @Field(() => ChatEventMinAggregateInput, { nullable: true })
  _min?: ChatEventMinAggregateInput;

  @Field(() => ChatEventMaxAggregateInput, { nullable: true })
  _max?: ChatEventMaxAggregateInput;
}
