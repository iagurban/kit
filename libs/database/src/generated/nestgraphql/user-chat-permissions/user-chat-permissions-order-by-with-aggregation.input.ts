import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UserChatPermissionsCountOrderByAggregateInput } from './user-chat-permissions-count-order-by-aggregate.input';
import { UserChatPermissionsMaxOrderByAggregateInput } from './user-chat-permissions-max-order-by-aggregate.input';
import { UserChatPermissionsMinOrderByAggregateInput } from './user-chat-permissions-min-order-by-aggregate.input';

@InputType()
export class UserChatPermissionsOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  userId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  chatId?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  roleId?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  permissions?: SortOrderInput;

  @Field(() => UserChatPermissionsCountOrderByAggregateInput, { nullable: true })
  _count?: UserChatPermissionsCountOrderByAggregateInput;

  @Field(() => UserChatPermissionsMaxOrderByAggregateInput, { nullable: true })
  _max?: UserChatPermissionsMaxOrderByAggregateInput;

  @Field(() => UserChatPermissionsMinOrderByAggregateInput, { nullable: true })
  _min?: UserChatPermissionsMinOrderByAggregateInput;
}
