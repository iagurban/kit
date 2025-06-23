import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class TaskToTaskRelationMaxOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  srcId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  dstId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  typeId?: `${SortOrder}`;
}
