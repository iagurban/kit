import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class TaskCountOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  title?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  state?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  archived?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  impact?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  ease?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  startAfterDate?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  startAfterOffset?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  plannedStartDate?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  plannedStartOffset?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  dueToDate?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  dueToOffset?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  authorId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  responsibleId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  parentId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  orderKey?: `${SortOrder}`;
}
