import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatMemberCountAggregateInput } from './chat-member-count-aggregate.input';
import { ChatMemberMaxAggregateInput } from './chat-member-max-aggregate.input';
import { ChatMemberMinAggregateInput } from './chat-member-min-aggregate.input';
import { ChatMemberOrderByWithRelationInput } from './chat-member-order-by-with-relation.input';
import { ChatMemberWhereInput } from './chat-member-where.input';
import { ChatMemberWhereUniqueInput } from './chat-member-where-unique.input';

@ArgsType()
export class ChatMemberAggregateArgs {
  @Field(() => ChatMemberWhereInput, { nullable: true })
  @Type(() => ChatMemberWhereInput)
  where?: ChatMemberWhereInput;

  @Field(() => [ChatMemberOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ChatMemberOrderByWithRelationInput>;

  @Field(() => ChatMemberWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ChatMemberWhereUniqueInput, 'userId_chatId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => ChatMemberCountAggregateInput, { nullable: true })
  _count?: ChatMemberCountAggregateInput;

  @Field(() => ChatMemberMinAggregateInput, { nullable: true })
  _min?: ChatMemberMinAggregateInput;

  @Field(() => ChatMemberMaxAggregateInput, { nullable: true })
  _max?: ChatMemberMaxAggregateInput;
}
