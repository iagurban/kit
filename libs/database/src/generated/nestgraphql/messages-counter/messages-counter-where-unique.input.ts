import { Field, InputType } from '@nestjs/graphql';

import { ChatScalarRelationFilter } from '../chat/chat-scalar-relation-filter.input';
import { BigIntFilter } from '../prisma/big-int-filter.input';
import { MessagesCounterWhereInput } from './messages-counter-where.input';

@InputType()
export class MessagesCounterWhereUniqueInput {
  @Field(() => String, { nullable: true })
  chatId?: string;

  @Field(() => [MessagesCounterWhereInput], { nullable: true })
  AND?: Array<MessagesCounterWhereInput>;

  @Field(() => [MessagesCounterWhereInput], { nullable: true })
  OR?: Array<MessagesCounterWhereInput>;

  @Field(() => [MessagesCounterWhereInput], { nullable: true })
  NOT?: Array<MessagesCounterWhereInput>;

  @Field(() => BigIntFilter, { nullable: true })
  lastNn?: BigIntFilter;

  @Field(() => ChatScalarRelationFilter, { nullable: true })
  chat?: ChatScalarRelationFilter;
}
