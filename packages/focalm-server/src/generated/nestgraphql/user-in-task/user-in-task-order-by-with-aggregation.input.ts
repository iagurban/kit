import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { UserInTaskCountOrderByAggregateInput } from './user-in-task-count-order-by-aggregate.input';
import { UserInTaskMaxOrderByAggregateInput } from './user-in-task-max-order-by-aggregate.input';
import { UserInTaskMinOrderByAggregateInput } from './user-in-task-min-order-by-aggregate.input';

@InputType()
export class UserInTaskOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  userId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  taskId?: `${SortOrder}`;

  @Field(() => UserInTaskCountOrderByAggregateInput, { nullable: true })
  _count?: UserInTaskCountOrderByAggregateInput;

  @Field(() => UserInTaskMaxOrderByAggregateInput, { nullable: true })
  _max?: UserInTaskMaxOrderByAggregateInput;

  @Field(() => UserInTaskMinOrderByAggregateInput, { nullable: true })
  _min?: UserInTaskMinOrderByAggregateInput;
}
