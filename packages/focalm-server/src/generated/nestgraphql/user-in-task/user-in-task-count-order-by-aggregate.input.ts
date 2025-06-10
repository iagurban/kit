import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UserInTaskCountOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  userId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  taskId?: `${SortOrder}`;
}
