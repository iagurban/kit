import { Field, InputType } from '@nestjs/graphql';

import { ChatScalarRelationFilter } from '../chat/chat-scalar-relation-filter.input';
import { BigIntFilter } from '../prisma/big-int-filter.input';
import { ChatEventsCounterWhereInput } from './chat-events-counter-where.input';

@InputType()
export class ChatEventsCounterWhereUniqueInput {
  @Field(() => String, { nullable: true })
  chatId?: string;

  @Field(() => [ChatEventsCounterWhereInput], { nullable: true })
  AND?: Array<ChatEventsCounterWhereInput>;

  @Field(() => [ChatEventsCounterWhereInput], { nullable: true })
  OR?: Array<ChatEventsCounterWhereInput>;

  @Field(() => [ChatEventsCounterWhereInput], { nullable: true })
  NOT?: Array<ChatEventsCounterWhereInput>;

  @Field(() => BigIntFilter, { nullable: true })
  lastNn?: BigIntFilter;

  @Field(() => ChatScalarRelationFilter, { nullable: true })
  chat?: ChatScalarRelationFilter;
}
