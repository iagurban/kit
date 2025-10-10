import { Field, InputType } from '@nestjs/graphql';

import { SortOrder } from '../prisma/sort-order.enum';
import { UserChatPermissionsOrderByRelevanceFieldEnum } from './user-chat-permissions-order-by-relevance-field.enum';

@InputType()
export class UserChatPermissionsOrderByRelevanceInput {
  @Field(() => [UserChatPermissionsOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<`${UserChatPermissionsOrderByRelevanceFieldEnum}`>;

  @Field(() => SortOrder, { nullable: false })
  sort!: `${SortOrder}`;

  @Field(() => String, { nullable: false })
  search!: string;
}
