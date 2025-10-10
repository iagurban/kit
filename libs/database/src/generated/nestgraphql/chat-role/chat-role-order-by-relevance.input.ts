import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { ChatRoleOrderByRelevanceFieldEnum } from './chat-role-order-by-relevance-field.enum';

@InputType()
export class ChatRoleOrderByRelevanceInput {
  @Field(() => [ChatRoleOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${ChatRoleOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
