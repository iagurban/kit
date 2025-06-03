import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { TaskHistoryGroupOrderByWithRelationInput } from '../task-history-group/task-history-group-order-by-with-relation.input';

@InputType()
export class TaskHistoryValueOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  groupId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  taskId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  key?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  value?: `${SortOrder}`;

  @Field(() => TaskHistoryGroupOrderByWithRelationInput, { nullable: true })
  group?: TaskHistoryGroupOrderByWithRelationInput;
}
