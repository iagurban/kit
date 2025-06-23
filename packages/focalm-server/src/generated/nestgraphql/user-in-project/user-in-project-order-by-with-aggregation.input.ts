import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { UserInProjectCountOrderByAggregateInput } from './user-in-project-count-order-by-aggregate.input';
import { UserInProjectMaxOrderByAggregateInput } from './user-in-project-max-order-by-aggregate.input';
import { UserInProjectMinOrderByAggregateInput } from './user-in-project-min-order-by-aggregate.input';

@InputType()
export class UserInProjectOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  userId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  projectId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  permission?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  kind?: `${SortOrder}`;

  @Field(() => UserInProjectCountOrderByAggregateInput, { nullable: true })
  _count?: UserInProjectCountOrderByAggregateInput;

  @Field(() => UserInProjectMaxOrderByAggregateInput, { nullable: true })
  _max?: UserInProjectMaxOrderByAggregateInput;

  @Field(() => UserInProjectMinOrderByAggregateInput, { nullable: true })
  _min?: UserInProjectMinOrderByAggregateInput;
}
