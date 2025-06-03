import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { TaskAvgOrderByAggregateInput } from './task-avg-order-by-aggregate.input';
import { TaskCountOrderByAggregateInput } from './task-count-order-by-aggregate.input';
import { TaskMaxOrderByAggregateInput } from './task-max-order-by-aggregate.input';
import { TaskMinOrderByAggregateInput } from './task-min-order-by-aggregate.input';
import { TaskSumOrderByAggregateInput } from './task-sum-order-by-aggregate.input';

@InputType()
export class TaskOrderByWithAggregationInput {
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

  @Field(() => TaskCountOrderByAggregateInput, { nullable: true })
  _count?: TaskCountOrderByAggregateInput;

  @Field(() => TaskAvgOrderByAggregateInput, { nullable: true })
  _avg?: TaskAvgOrderByAggregateInput;

  @Field(() => TaskMaxOrderByAggregateInput, { nullable: true })
  _max?: TaskMaxOrderByAggregateInput;

  @Field(() => TaskMinOrderByAggregateInput, { nullable: true })
  _min?: TaskMinOrderByAggregateInput;

  @Field(() => TaskSumOrderByAggregateInput, { nullable: true })
  _sum?: TaskSumOrderByAggregateInput;
}
