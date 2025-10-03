import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ChatEventsCounterAvgOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  lastNn?: `${SortOrder}`;
}
