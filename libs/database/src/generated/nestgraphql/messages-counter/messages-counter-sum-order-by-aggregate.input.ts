import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class MessagesCounterSumOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  lastNn?: `${SortOrder}`;
}
