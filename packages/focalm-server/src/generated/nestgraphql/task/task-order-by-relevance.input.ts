import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { TaskOrderByRelevanceFieldEnum } from './task-order-by-relevance-field.enum';

@InputType()
export class TaskOrderByRelevanceInput {
  @Field(() => [TaskOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${TaskOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
