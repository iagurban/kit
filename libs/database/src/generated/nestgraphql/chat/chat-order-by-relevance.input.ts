import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ChatOrderByRelevanceFieldEnum } from './chat-order-by-relevance-field.enum';

@InputType()
export class ChatOrderByRelevanceInput {
  @Field(() => [ChatOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${ChatOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
