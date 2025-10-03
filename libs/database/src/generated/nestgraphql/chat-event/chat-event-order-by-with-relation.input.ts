import { Field, InputType } from '@nestjs/graphql';

import { ChatOrderByWithRelationInput } from '../chat/chat-order-by-with-relation.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { ChatEventOrderByRelevanceInput } from './chat-event-order-by-relevance.input';

@InputType()
export class ChatEventOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  nn?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  chatId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  authorId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  type?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  payload?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  createdAt?: `${SortOrder}`;

  @Field(() => ChatOrderByWithRelationInput, { nullable: true })
  chat?: ChatOrderByWithRelationInput;

  @Field(() => UserOrderByWithRelationInput, { nullable: true })
  author?: UserOrderByWithRelationInput;

  @Field(() => ChatEventOrderByRelevanceInput, { nullable: true })
  _relevance?: ChatEventOrderByRelevanceInput;
}
