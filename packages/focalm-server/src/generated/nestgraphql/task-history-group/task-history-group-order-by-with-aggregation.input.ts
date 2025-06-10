import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { TaskHistoryGroupCountOrderByAggregateInput } from './task-history-group-count-order-by-aggregate.input';
import { TaskHistoryGroupMaxOrderByAggregateInput } from './task-history-group-max-order-by-aggregate.input';
import { TaskHistoryGroupMinOrderByAggregateInput } from './task-history-group-min-order-by-aggregate.input';

@InputType()
export class TaskHistoryGroupOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  authorId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  localCreatedAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  createdAtFixReason?: SortOrderInput;

  @Field(() => TaskHistoryGroupCountOrderByAggregateInput, { nullable: true })
  _count?: TaskHistoryGroupCountOrderByAggregateInput;

  @Field(() => TaskHistoryGroupMaxOrderByAggregateInput, { nullable: true })
  _max?: TaskHistoryGroupMaxOrderByAggregateInput;

  @Field(() => TaskHistoryGroupMinOrderByAggregateInput, { nullable: true })
  _min?: TaskHistoryGroupMinOrderByAggregateInput;
}
