import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class TaskToTaskRelationTypeMinOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  forward?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  inverse?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  projectId?: `${SortOrder}`;
}
