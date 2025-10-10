import { Field, InputType } from '@nestjs/graphql';

import { ChatOrderByWithRelationInput } from '../chat/chat-order-by-with-relation.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { ChatMemberOrderByRelevanceInput } from './chat-member-order-by-relevance.input';

@InputType()
export class ChatMemberOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  userId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  chatId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  joinedAt?: `${SortOrder}`;

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  user?: UserOrderByWithRelationInput;

  @Field(() => ChatOrderByWithRelationInput, { nullable: true })
  chat?: ChatOrderByWithRelationInput;

  @Field(() => ChatMemberOrderByRelevanceInput, { nullable: true })
  _relevance?: ChatMemberOrderByRelevanceInput;
}
