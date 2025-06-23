import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class UserInProjectMinOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  userId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  projectId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  permission?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  kind?: `${SortOrder}`;
}
