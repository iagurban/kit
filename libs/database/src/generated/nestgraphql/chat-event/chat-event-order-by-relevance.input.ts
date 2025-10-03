import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ChatEventOrderByRelevanceFieldEnum } from './chat-event-order-by-relevance-field.enum';

@InputType()
export class ChatEventOrderByRelevanceInput {
  @Field(() => [ChatEventOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${ChatEventOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
