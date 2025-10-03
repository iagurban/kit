import { Field, InputType } from '@nestjs/graphql';

import { ChatEventOrderByRelationAggregateInput } from '../chat-event/chat-event-order-by-relation-aggregate.input';
import { ChatEventsCounterOrderByWithRelationInput } from '../chat-events-counter/chat-events-counter-order-by-with-relation.input';
import { MessagesCounterOrderByWithRelationInput } from '../messages-counter/messages-counter-order-by-with-relation.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { ChatOrderByRelevanceInput } from './chat-order-by-relevance.input';

@InputType()
export class ChatOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: `${SortOrder}`;

  @Field(() => SortOrder, { nullable: true })
  title?: `${SortOrder}`;

  @Field(() => SortOrderInput, { nullable: true })
  bio?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  avatar?: SortOrderInput;

  @Field(() => ChatEventOrderByRelationAggregateInput, { nullable: true })
  events?: ChatEventOrderByRelationAggregateInput;

  @Field(() => ChatEventsCounterOrderByWithRelationInput, { nullable: true })
  eventsCounter?: ChatEventsCounterOrderByWithRelationInput;

  @Field(() => MessagesCounterOrderByWithRelationInput, { nullable: true })
  messagesCounter?: MessagesCounterOrderByWithRelationInput;

  @Field(() => ChatOrderByRelevanceInput, { nullable: true })
  _relevance?: ChatOrderByRelevanceInput;
}
