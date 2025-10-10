import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ChatRoleCountOrderByAggregateInput } from './chat-role-count-order-by-aggregate.input';
import { ChatRoleMaxOrderByAggregateInput } from './chat-role-max-order-by-aggregate.input';
import { ChatRoleMinOrderByAggregateInput } from './chat-role-min-order-by-aggregate.input';

@InputType()
export class ChatRoleOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  chatId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  name?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  tags?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  permissions?: `${SortOrder}`;

  @Field(() => ChatRoleCountOrderByAggregateInput, { nullable: true })
  _count?: ChatRoleCountOrderByAggregateInput;

  @Field(() => ChatRoleMaxOrderByAggregateInput, { nullable: true })
  _max?: ChatRoleMaxOrderByAggregateInput;

  @Field(() => ChatRoleMinOrderByAggregateInput, { nullable: true })
  _min?: ChatRoleMinOrderByAggregateInput;
}
