import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { TaskHistoryGroupOrderByRelevanceFieldEnum } from './task-history-group-order-by-relevance-field.enum';

@InputType()
export class TaskHistoryGroupOrderByRelevanceInput {
  @Field(() => [TaskHistoryGroupOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${TaskHistoryGroupOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
