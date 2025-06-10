import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class TaskAvgOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  impact?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  ease?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  startAfterOffset?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  plannedStartOffset?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  dueToOffset?: `${SortOrder}`;
}
