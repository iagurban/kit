import { Field, InputType } from '@nestjs/graphql';

import { ChatOrderByWithRelationInput } from '../chat/chat-order-by-with-relation.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { ChatEventsCounterOrderByRelevanceInput } from './chat-events-counter-order-by-relevance.input';

@InputType()
export class ChatEventsCounterOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  chatId?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  lastNn?: `${SortOrder}`;

  @Field(() => ChatOrderByWithRelationInput, { nullable: true })
  chat?: ChatOrderByWithRelationInput;

  @Field(() => ChatEventsCounterOrderByRelevanceInput, { nullable: true })
  _relevance?: ChatEventsCounterOrderByRelevanceInput;
}
