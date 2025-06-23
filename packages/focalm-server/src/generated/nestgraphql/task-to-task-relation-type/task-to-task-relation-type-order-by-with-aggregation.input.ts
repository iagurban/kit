import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { TaskToTaskRelationTypeCountOrderByAggregateInput } from './task-to-task-relation-type-count-order-by-aggregate.input';
import { TaskToTaskRelationTypeMaxOrderByAggregateInput } from './task-to-task-relation-type-max-order-by-aggregate.input';
import { TaskToTaskRelationTypeMinOrderByAggregateInput } from './task-to-task-relation-type-min-order-by-aggregate.input';

@InputType()
export class TaskToTaskRelationTypeOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  forward?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  inverse?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  projectId?: `${SortOrder}`;

  @Field(() => TaskToTaskRelationTypeCountOrderByAggregateInput, { nullable: true })
  _count?: TaskToTaskRelationTypeCountOrderByAggregateInput;

  @Field(() => TaskToTaskRelationTypeMaxOrderByAggregateInput, { nullable: true })
  _max?: TaskToTaskRelationTypeMaxOrderByAggregateInput;

  @Field(() => TaskToTaskRelationTypeMinOrderByAggregateInput, { nullable: true })
  _min?: TaskToTaskRelationTypeMinOrderByAggregateInput;
}
