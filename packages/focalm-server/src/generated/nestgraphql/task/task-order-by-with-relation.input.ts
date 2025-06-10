import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { TaskHistoryValueOrderByRelationAggregateInput } from '../task-history-value/task-history-value-order-by-relation-aggregate.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { UserInTaskOrderByRelationAggregateInput } from '../user-in-task/user-in-task-order-by-relation-aggregate.input';
import { TaskOrderByRelationAggregateInput } from './task-order-by-relation-aggregate.input';

@InputType()
export class TaskOrderByWithRelationInput {
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

  @Field(() => SortOrderInput, { nullable: true })
  startAfterDate?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  startAfterOffset?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  plannedStartDate?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  plannedStartOffset?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  dueToDate?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  dueToOffset?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  updatedAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  authorId?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  responsibleId?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  parentId?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  orderKey?: `${SortOrder}`;

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  author?: UserOrderByWithRelationInput;

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  responsible?: UserOrderByWithRelationInput;

  @Field(() => TaskOrderByWithRelationInput, { nullable: true })
  parent?: TaskOrderByWithRelationInput;

  @Field(() => TaskOrderByRelationAggregateInput, { nullable: true })
  children?: TaskOrderByRelationAggregateInput;

  @Field(() => UserInTaskOrderByRelationAggregateInput, { nullable: true })
  participants?: UserInTaskOrderByRelationAggregateInput;

  @Field(() => TaskHistoryValueOrderByRelationAggregateInput, { nullable: true })
  historyValues?: TaskHistoryValueOrderByRelationAggregateInput;
}
