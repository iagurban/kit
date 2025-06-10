import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class TaskHistoryValueMinOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  groupId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  taskId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  key?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  op?: `${SortOrder}`;
}
