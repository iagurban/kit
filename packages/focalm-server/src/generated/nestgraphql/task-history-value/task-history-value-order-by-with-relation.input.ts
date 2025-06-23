import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { TaskOrderByWithRelationInput } from '../task/task-order-by-with-relation.input';
import { TaskHistoryGroupOrderByWithRelationInput } from '../task-history-group/task-history-group-order-by-with-relation.input';
import { TaskHistoryValueOrderByRelevanceInput } from './task-history-value-order-by-relevance.input';

@InputType()
export class TaskHistoryValueOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

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

  @Field(() => TaskHistoryGroupOrderByWithRelationInput, { nullable: true })
  group?: TaskHistoryGroupOrderByWithRelationInput;

  @Field(() => TaskOrderByWithRelationInput, { nullable: true })
  task?: TaskOrderByWithRelationInput;

  @Field(() => TaskHistoryValueOrderByRelevanceInput, { nullable: true })
  _relevance?: TaskHistoryValueOrderByRelevanceInput;
}
