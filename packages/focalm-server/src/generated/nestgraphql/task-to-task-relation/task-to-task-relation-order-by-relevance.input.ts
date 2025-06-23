import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { TaskToTaskRelationOrderByRelevanceFieldEnum } from './task-to-task-relation-order-by-relevance-field.enum';

@InputType()
export class TaskToTaskRelationOrderByRelevanceInput {
  @Field(() => [TaskToTaskRelationOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${TaskToTaskRelationOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
