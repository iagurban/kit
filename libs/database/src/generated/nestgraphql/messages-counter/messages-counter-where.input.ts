import { Field, InputType } from '@nestjs/graphql';

import { ChatScalarRelationFilter } from '../chat/chat-scalar-relation-filter.input';
import { BigIntFilter } from '../prisma/big-int-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class MessagesCounterWhereInput {
  @Field(() => [MessagesCounterWhereInput], { nullable: true })
  AND?: Array<MessagesCounterWhereInput>;

  @Field(() => [MessagesCounterWhereInput], { nullable: true })
  OR?: Array<MessagesCounterWhereInput>;

  @Field(() => [MessagesCounterWhereInput], { nullable: true })
  NOT?: Array<MessagesCounterWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  chatId?: UuidFilter;

  @Field(() => BigIntFilter, { nullable: true })
  lastNn?: BigIntFilter;

  @Field(() => ChatScalarRelationFilter, { nullable: true })
  chat?: ChatScalarRelationFilter;
}
