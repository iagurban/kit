import { Field, InputType } from '@nestjs/graphql';

import { ChatScalarRelationFilter } from '../chat/chat-scalar-relation-filter.input';
import { BigIntFilter } from '../prisma/big-int-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class ChatEventsCounterWhereInput {
  @Field(() => [ChatEventsCounterWhereInput], { nullable: true })
  AND?: Array<ChatEventsCounterWhereInput>;

  @Field(() => [ChatEventsCounterWhereInput], { nullable: true })
  OR?: Array<ChatEventsCounterWhereInput>;

  @Field(() => [ChatEventsCounterWhereInput], { nullable: true })
  NOT?: Array<ChatEventsCounterWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  chatId?: UuidFilter;

  @Field(() => BigIntFilter, { nullable: true })
  lastNn?: BigIntFilter;

  @Field(() => ChatScalarRelationFilter, { nullable: true })
  chat?: ChatScalarRelationFilter;
}
