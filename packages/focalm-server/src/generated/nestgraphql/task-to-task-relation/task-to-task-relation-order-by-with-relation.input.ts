import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { TaskOrderByWithRelationInput } from '../task/task-order-by-with-relation.input';
import { TaskToTaskRelationTypeOrderByWithRelationInput } from '../task-to-task-relation-type/task-to-task-relation-type-order-by-with-relation.input';
import { TaskToTaskRelationOrderByRelevanceInput } from './task-to-task-relation-order-by-relevance.input';

@InputType()
export class TaskToTaskRelationOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  srcId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  dstId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  typeId?: `${SortOrder}`;

  @Field(() => TaskOrderByWithRelationInput, { nullable: true })
  src?: TaskOrderByWithRelationInput;

  @Field(() => TaskOrderByWithRelationInput, { nullable: true })
  dst?: TaskOrderByWithRelationInput;

  @Field(() => TaskToTaskRelationTypeOrderByWithRelationInput, { nullable: true })
  type?: TaskToTaskRelationTypeOrderByWithRelationInput;

  @Field(() => TaskToTaskRelationOrderByRelevanceInput, { nullable: true })
  _relevance?: TaskToTaskRelationOrderByRelevanceInput;
}
