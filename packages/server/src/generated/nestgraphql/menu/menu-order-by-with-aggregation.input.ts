import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { MenuCountOrderByAggregateInput } from './menu-count-order-by-aggregate.input';
import { MenuMaxOrderByAggregateInput } from './menu-max-order-by-aggregate.input';
import { MenuMinOrderByAggregateInput } from './menu-min-order-by-aggregate.input';

@InputType()
export class MenuOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  title?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  ownerId?: `${SortOrder}`;

  @Field(() => MenuCountOrderByAggregateInput, { nullable: true })
  _count?: MenuCountOrderByAggregateInput;

  @Field(() => MenuMaxOrderByAggregateInput, { nullable: true })
  _max?: MenuMaxOrderByAggregateInput;

  @Field(() => MenuMinOrderByAggregateInput, { nullable: true })
  _min?: MenuMinOrderByAggregateInput;
}
