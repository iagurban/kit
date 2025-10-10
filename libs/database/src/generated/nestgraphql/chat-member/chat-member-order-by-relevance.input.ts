import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ChatMemberOrderByRelevanceFieldEnum } from './chat-member-order-by-relevance-field.enum';

@InputType()
export class ChatMemberOrderByRelevanceInput {
  @Field(() => [ChatMemberOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${ChatMemberOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
