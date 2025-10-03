import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { MessagesCounterOrderByRelevanceFieldEnum } from './messages-counter-order-by-relevance-field.enum';

@InputType()
export class MessagesCounterOrderByRelevanceInput {
  @Field(() => [MessagesCounterOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${MessagesCounterOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
