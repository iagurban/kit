import { Field, InputType } from '@nestjs/graphql';

import { ChatEventListRelationFilter } from '../chat-event/chat-event-list-relation-filter.input';
import { ChatEventsCounterNullableScalarRelationFilter } from '../chat-events-counter/chat-events-counter-nullable-scalar-relation-filter.input';
import { MessagesCounterNullableScalarRelationFilter } from '../messages-counter/messages-counter-nullable-scalar-relation-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class ChatWhereInput {
  @Field(() => [ChatWhereInput], { nullable: true })
  AND?: Array<ChatWhereInput>;

  @Field(() => [ChatWhereInput], { nullable: true })
  OR?: Array<ChatWhereInput>;

  @Field(() => [ChatWhereInput], { nullable: true })
  NOT?: Array<ChatWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  bio?: StringNullableFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  avatar?: StringNullableFilter;

  @Field(() => ChatEventListRelationFilter, { nullable: true })
  events?: ChatEventListRelationFilter;

  @Field(() => ChatEventsCounterNullableScalarRelationFilter, { nullable: true })
  eventsCounter?: ChatEventsCounterNullableScalarRelationFilter;

  @Field(() => MessagesCounterNullableScalarRelationFilter, { nullable: true })
  messagesCounter?: MessagesCounterNullableScalarRelationFilter;
}
