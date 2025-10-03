import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ChatEventsCounterAvgOrderByAggregateInput } from './chat-events-counter-avg-order-by-aggregate.input';
import { ChatEventsCounterCountOrderByAggregateInput } from './chat-events-counter-count-order-by-aggregate.input';
import { ChatEventsCounterMaxOrderByAggregateInput } from './chat-events-counter-max-order-by-aggregate.input';
import { ChatEventsCounterMinOrderByAggregateInput } from './chat-events-counter-min-order-by-aggregate.input';
import { ChatEventsCounterSumOrderByAggregateInput } from './chat-events-counter-sum-order-by-aggregate.input';

@InputType()
export class ChatEventsCounterOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  chatId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  lastNn?: `${SortOrder}`;

  @Field(() => ChatEventsCounterCountOrderByAggregateInput, { nullable: true })
  _count?: ChatEventsCounterCountOrderByAggregateInput;

  @Field(() => ChatEventsCounterAvgOrderByAggregateInput, { nullable: true })
  _avg?: ChatEventsCounterAvgOrderByAggregateInput;

  @Field(() => ChatEventsCounterMaxOrderByAggregateInput, { nullable: true })
  _max?: ChatEventsCounterMaxOrderByAggregateInput;

  @Field(() => ChatEventsCounterMinOrderByAggregateInput, { nullable: true })
  _min?: ChatEventsCounterMinOrderByAggregateInput;

  @Field(() => ChatEventsCounterSumOrderByAggregateInput, { nullable: true })
  _sum?: ChatEventsCounterSumOrderByAggregateInput;
}
