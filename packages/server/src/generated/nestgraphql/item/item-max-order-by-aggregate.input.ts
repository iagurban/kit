import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ItemMaxOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  orderKey?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  title?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  description?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  price?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  archived?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  imageId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  menuId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  parentId?: `${SortOrder}`;
}
