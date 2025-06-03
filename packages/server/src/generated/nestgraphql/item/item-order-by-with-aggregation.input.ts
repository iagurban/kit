import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ItemAvgOrderByAggregateInput } from './item-avg-order-by-aggregate.input';
import { ItemCountOrderByAggregateInput } from './item-count-order-by-aggregate.input';
import { ItemMaxOrderByAggregateInput } from './item-max-order-by-aggregate.input';
import { ItemMinOrderByAggregateInput } from './item-min-order-by-aggregate.input';
import { ItemSumOrderByAggregateInput } from './item-sum-order-by-aggregate.input';

@InputType()
export class ItemOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  orderKey?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  title?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  description?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  @Type(() => SortOrderInput)
  price?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  archived?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  imageId?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  menuId?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  parentId?: SortOrderInput;

  @Field(() => ItemCountOrderByAggregateInput, { nullable: true })
  @Type(() => ItemCountOrderByAggregateInput)
  _count?: ItemCountOrderByAggregateInput;

  @Field(() => ItemAvgOrderByAggregateInput, { nullable: true })
  @Type(() => ItemAvgOrderByAggregateInput)
  _avg?: ItemAvgOrderByAggregateInput;

  @Field(() => ItemMaxOrderByAggregateInput, { nullable: true })
  @Type(() => ItemMaxOrderByAggregateInput)
  _max?: ItemMaxOrderByAggregateInput;

  @Field(() => ItemMinOrderByAggregateInput, { nullable: true })
  @Type(() => ItemMinOrderByAggregateInput)
  _min?: ItemMinOrderByAggregateInput;

  @Field(() => ItemSumOrderByAggregateInput, { nullable: true })
  @Type(() => ItemSumOrderByAggregateInput)
  _sum?: ItemSumOrderByAggregateInput;
}
