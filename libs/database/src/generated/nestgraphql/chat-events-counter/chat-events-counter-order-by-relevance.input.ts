import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ChatEventsCounterOrderByRelevanceFieldEnum } from './chat-events-counter-order-by-relevance-field.enum';

@InputType()
export class ChatEventsCounterOrderByRelevanceInput {
  @Field(() => [ChatEventsCounterOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${ChatEventsCounterOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
