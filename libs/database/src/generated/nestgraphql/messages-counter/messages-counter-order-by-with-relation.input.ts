import { Field, InputType } from '@nestjs/graphql';

import { ChatOrderByWithRelationInput } from '../chat/chat-order-by-with-relation.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { MessagesCounterOrderByRelevanceInput } from './messages-counter-order-by-relevance.input';

@InputType()
export class MessagesCounterOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  chatId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  lastNn?: `${SortOrder}`;

  @Field(() => ChatOrderByWithRelationInput, { nullable: true })
  chat?: ChatOrderByWithRelationInput;

  @Field(() => MessagesCounterOrderByRelevanceInput, { nullable: true })
  _relevance?: MessagesCounterOrderByRelevanceInput;
}
