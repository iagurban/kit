import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { TaskHistoryGroupOrderByRelationAggregateInput } from '../task-history-group/task-history-group-order-by-relation-aggregate.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
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
  startAfter?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  plannedStart?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  dueTo?: SortOrderInput;

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

  @Field(() => TaskHistoryGroupOrderByRelationAggregateInput, { nullable: true })
  historyGroups?: TaskHistoryGroupOrderByRelationAggregateInput;
}
