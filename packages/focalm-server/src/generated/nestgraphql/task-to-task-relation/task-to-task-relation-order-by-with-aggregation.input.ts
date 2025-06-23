import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { TaskToTaskRelationCountOrderByAggregateInput } from './task-to-task-relation-count-order-by-aggregate.input';
import { TaskToTaskRelationMaxOrderByAggregateInput } from './task-to-task-relation-max-order-by-aggregate.input';
import { TaskToTaskRelationMinOrderByAggregateInput } from './task-to-task-relation-min-order-by-aggregate.input';

@InputType()
export class TaskToTaskRelationOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  srcId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  dstId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  typeId?: `${SortOrder}`;

  @Field(() => TaskToTaskRelationCountOrderByAggregateInput, { nullable: true })
  _count?: TaskToTaskRelationCountOrderByAggregateInput;

  @Field(() => TaskToTaskRelationMaxOrderByAggregateInput, { nullable: true })
  _max?: TaskToTaskRelationMaxOrderByAggregateInput;

  @Field(() => TaskToTaskRelationMinOrderByAggregateInput, { nullable: true })
  _min?: TaskToTaskRelationMinOrderByAggregateInput;
}
