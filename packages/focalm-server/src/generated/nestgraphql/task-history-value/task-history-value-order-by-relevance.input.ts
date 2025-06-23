import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { TaskHistoryValueOrderByRelevanceFieldEnum } from './task-history-value-order-by-relevance-field.enum';

@InputType()
export class TaskHistoryValueOrderByRelevanceInput {
  @Field(() => [TaskHistoryValueOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${TaskHistoryValueOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
