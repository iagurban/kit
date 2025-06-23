import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { UserInTaskTagCountOrderByAggregateInput } from './user-in-task-tag-count-order-by-aggregate.input';
import { UserInTaskTagMaxOrderByAggregateInput } from './user-in-task-tag-max-order-by-aggregate.input';
import { UserInTaskTagMinOrderByAggregateInput } from './user-in-task-tag-min-order-by-aggregate.input';

@InputType()
export class UserInTaskTagOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  userInTaskId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  roleId?: `${SortOrder}`;

  @Field(() => UserInTaskTagCountOrderByAggregateInput, { nullable: true })
  _count?: UserInTaskTagCountOrderByAggregateInput;

  @Field(() => UserInTaskTagMaxOrderByAggregateInput, { nullable: true })
  _max?: UserInTaskTagMaxOrderByAggregateInput;

  @Field(() => UserInTaskTagMinOrderByAggregateInput, { nullable: true })
  _min?: UserInTaskTagMinOrderByAggregateInput;
}
