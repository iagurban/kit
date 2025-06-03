import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ItemAvgOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  price?: `${SortOrder}`;
}
