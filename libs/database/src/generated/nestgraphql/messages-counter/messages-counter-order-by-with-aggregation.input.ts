import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { MessagesCounterAvgOrderByAggregateInput } from './messages-counter-avg-order-by-aggregate.input';
import { MessagesCounterCountOrderByAggregateInput } from './messages-counter-count-order-by-aggregate.input';
import { MessagesCounterMaxOrderByAggregateInput } from './messages-counter-max-order-by-aggregate.input';
import { MessagesCounterMinOrderByAggregateInput } from './messages-counter-min-order-by-aggregate.input';
import { MessagesCounterSumOrderByAggregateInput } from './messages-counter-sum-order-by-aggregate.input';

@InputType()
export class MessagesCounterOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  chatId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  lastNn?: `${SortOrder}`;

  @Field(() => MessagesCounterCountOrderByAggregateInput, { nullable: true })
  _count?: MessagesCounterCountOrderByAggregateInput;

  @Field(() => MessagesCounterAvgOrderByAggregateInput, { nullable: true })
  _avg?: MessagesCounterAvgOrderByAggregateInput;

  @Field(() => MessagesCounterMaxOrderByAggregateInput, { nullable: true })
  _max?: MessagesCounterMaxOrderByAggregateInput;

  @Field(() => MessagesCounterMinOrderByAggregateInput, { nullable: true })
  _min?: MessagesCounterMinOrderByAggregateInput;

  @Field(() => MessagesCounterSumOrderByAggregateInput, { nullable: true })
  _sum?: MessagesCounterSumOrderByAggregateInput;
}
