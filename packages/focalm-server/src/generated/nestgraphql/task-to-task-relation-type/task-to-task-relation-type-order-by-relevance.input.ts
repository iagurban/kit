import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { TaskToTaskRelationTypeOrderByRelevanceFieldEnum } from './task-to-task-relation-type-order-by-relevance-field.enum';

@InputType()
export class TaskToTaskRelationTypeOrderByRelevanceInput {
  @Field(() => [TaskToTaskRelationTypeOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${TaskToTaskRelationTypeOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
