import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ChatEventAvgOrderByAggregateInput } from './chat-event-avg-order-by-aggregate.input';
import { ChatEventCountOrderByAggregateInput } from './chat-event-count-order-by-aggregate.input';
import { ChatEventMaxOrderByAggregateInput } from './chat-event-max-order-by-aggregate.input';
import { ChatEventMinOrderByAggregateInput } from './chat-event-min-order-by-aggregate.input';
import { ChatEventSumOrderByAggregateInput } from './chat-event-sum-order-by-aggregate.input';

@InputType()
export class ChatEventOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  nn?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  chatId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  authorId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  type?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  payload?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => ChatEventCountOrderByAggregateInput, { nullable: true })
  _count?: ChatEventCountOrderByAggregateInput;

  @Field(() => ChatEventAvgOrderByAggregateInput, { nullable: true })
  _avg?: ChatEventAvgOrderByAggregateInput;

  @Field(() => ChatEventMaxOrderByAggregateInput, { nullable: true })
  _max?: ChatEventMaxOrderByAggregateInput;

  @Field(() => ChatEventMinOrderByAggregateInput, { nullable: true })
  _min?: ChatEventMinOrderByAggregateInput;

  @Field(() => ChatEventSumOrderByAggregateInput, { nullable: true })
  _sum?: ChatEventSumOrderByAggregateInput;
}
