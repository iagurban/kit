import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { TaskOrderByWithRelationInput } from '../task/task-order-by-with-relation.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { UserInTaskTagOrderByRelationAggregateInput } from '../user-in-task-tag/user-in-task-tag-order-by-relation-aggregate.input';
import { UserInTaskOrderByRelevanceInput } from './user-in-task-order-by-relevance.input';

@InputType()
export class UserInTaskOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  userId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  taskId?: `${SortOrder}`;

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  user?: UserOrderByWithRelationInput;

  @Field(() => TaskOrderByWithRelationInput, { nullable: true })
  task?: TaskOrderByWithRelationInput;

  @Field(() => UserInTaskTagOrderByRelationAggregateInput, { nullable: true })
  tags?: UserInTaskTagOrderByRelationAggregateInput;

  @Field(() => UserInTaskOrderByRelevanceInput, { nullable: true })
  _relevance?: UserInTaskOrderByRelevanceInput;
}
