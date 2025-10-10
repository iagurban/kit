import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ChatMemberCountOrderByAggregateInput } from './chat-member-count-order-by-aggregate.input';
import { ChatMemberMaxOrderByAggregateInput } from './chat-member-max-order-by-aggregate.input';
import { ChatMemberMinOrderByAggregateInput } from './chat-member-min-order-by-aggregate.input';

@InputType()
export class ChatMemberOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  userId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  chatId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  joinedAt?: `${SortOrder}`;

  @Field(() => ChatMemberCountOrderByAggregateInput, { nullable: true })
  _count?: ChatMemberCountOrderByAggregateInput;

  @Field(() => ChatMemberMaxOrderByAggregateInput, { nullable: true })
  _max?: ChatMemberMaxOrderByAggregateInput;

  @Field(() => ChatMemberMinOrderByAggregateInput, { nullable: true })
  _min?: ChatMemberMinOrderByAggregateInput;
}
