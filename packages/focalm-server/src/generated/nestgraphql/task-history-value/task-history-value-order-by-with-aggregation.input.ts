import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { TaskHistoryValueCountOrderByAggregateInput } from './task-history-value-count-order-by-aggregate.input';
import { TaskHistoryValueMaxOrderByAggregateInput } from './task-history-value-max-order-by-aggregate.input';
import { TaskHistoryValueMinOrderByAggregateInput } from './task-history-value-min-order-by-aggregate.input';

@InputType()
export class TaskHistoryValueOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  groupId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  taskId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  key?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  op?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  value?: `${SortOrder}`;

  @Field(() => TaskHistoryValueCountOrderByAggregateInput, { nullable: true })
  _count?: TaskHistoryValueCountOrderByAggregateInput;

  @Field(() => TaskHistoryValueMaxOrderByAggregateInput, { nullable: true })
  _max?: TaskHistoryValueMaxOrderByAggregateInput;

  @Field(() => TaskHistoryValueMinOrderByAggregateInput, { nullable: true })
  _min?: TaskHistoryValueMinOrderByAggregateInput;
}
