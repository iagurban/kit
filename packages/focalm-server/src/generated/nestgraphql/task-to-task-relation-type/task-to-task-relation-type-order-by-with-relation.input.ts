import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ProjectOrderByWithRelationInput } from '../project/project-order-by-with-relation.input';
import { TaskToTaskRelationOrderByRelationAggregateInput } from '../task-to-task-relation/task-to-task-relation-order-by-relation-aggregate.input';
import { TaskToTaskRelationTypeOrderByRelevanceInput } from './task-to-task-relation-type-order-by-relevance.input';

@InputType()
export class TaskToTaskRelationTypeOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  forward?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  inverse?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  projectId?: `${SortOrder}`;

  @Field(() => TaskToTaskRelationOrderByRelationAggregateInput, { nullable: true })
  relations?: TaskToTaskRelationOrderByRelationAggregateInput;

  @Field(() => ProjectOrderByWithRelationInput, { nullable: true })
  project?: ProjectOrderByWithRelationInput;

  @Field(() => TaskToTaskRelationTypeOrderByRelevanceInput, { nullable: true })
  _relevance?: TaskToTaskRelationTypeOrderByRelevanceInput;
}
