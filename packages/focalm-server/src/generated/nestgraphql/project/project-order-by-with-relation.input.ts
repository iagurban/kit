import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { TaskOrderByRelationAggregateInput } from '../task/task-order-by-relation-aggregate.input';
import { TaskToTaskRelationTypeOrderByRelationAggregateInput } from '../task-to-task-relation-type/task-to-task-relation-type-order-by-relation-aggregate.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { UserInProjectOrderByRelationAggregateInput } from '../user-in-project/user-in-project-order-by-relation-aggregate.input';
import { ProjectOrderByRelevanceInput } from './project-order-by-relevance.input';

@InputType()
export class ProjectOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  tasksCounter?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  name?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  abbrev?: SortOrderInput;

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  ownOf?: UserOrderByWithRelationInput;

  @Field(() => TaskToTaskRelationTypeOrderByRelationAggregateInput, { nullable: true })
  relationTypes?: TaskToTaskRelationTypeOrderByRelationAggregateInput;

  @Field(() => TaskOrderByRelationAggregateInput, { nullable: true })
  tasks?: TaskOrderByRelationAggregateInput;

  @Field(() => UserInProjectOrderByRelationAggregateInput, { nullable: true })
  usersPermissions?: UserInProjectOrderByRelationAggregateInput;

  @Field(() => ProjectOrderByRelevanceInput, { nullable: true })
  _relevance?: ProjectOrderByRelevanceInput;
}
