import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { TaskOrderByWithRelationInput } from '../task/task-order-by-with-relation.input';
import { TaskHistoryValueOrderByRelationAggregateInput } from '../task-history-value/task-history-value-order-by-relation-aggregate.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';

@InputType()
export class TaskHistoryGroupOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  taskId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  authorId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  localCreatedAt?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  createdAtFixReason?: SortOrderInput;

  @Field(() => TaskOrderByWithRelationInput, { nullable: true })
  task?: TaskOrderByWithRelationInput;

  @Field(() => TaskHistoryValueOrderByRelationAggregateInput, { nullable: true })
  values?: TaskHistoryValueOrderByRelationAggregateInput;

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  author?: UserOrderByWithRelationInput;
}
