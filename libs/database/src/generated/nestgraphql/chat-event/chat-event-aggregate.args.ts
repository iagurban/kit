import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatEventAvgAggregateInput } from './chat-event-avg-aggregate.input';
import { ChatEventCountAggregateInput } from './chat-event-count-aggregate.input';
import { ChatEventMaxAggregateInput } from './chat-event-max-aggregate.input';
import { ChatEventMinAggregateInput } from './chat-event-min-aggregate.input';
import { ChatEventOrderByWithRelationInput } from './chat-event-order-by-with-relation.input';
import { ChatEventSumAggregateInput } from './chat-event-sum-aggregate.input';
import { ChatEventWhereInput } from './chat-event-where.input';
import { ChatEventWhereUniqueInput } from './chat-event-where-unique.input';

@ArgsType()
export class ChatEventAggregateArgs {
  @Field(() => ChatEventWhereInput, { nullable: true })
  @Type(() => ChatEventWhereInput)
  where?: ChatEventWhereInput;

  @Field(() => [ChatEventOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ChatEventOrderByWithRelationInput>;

  @Field(() => ChatEventWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ChatEventWhereUniqueInput, 'id' | 'chatId_nn'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => ChatEventCountAggregateInput, { nullable: true })
  _count?: ChatEventCountAggregateInput;

  @Field(() => ChatEventAvgAggregateInput, { nullable: true })
  _avg?: ChatEventAvgAggregateInput;

  @Field(() => ChatEventSumAggregateInput, { nullable: true })
  _sum?: ChatEventSumAggregateInput;

  @Field(() => ChatEventMinAggregateInput, { nullable: true })
  _min?: ChatEventMinAggregateInput;

  @Field(() => ChatEventMaxAggregateInput, { nullable: true })
  _max?: ChatEventMaxAggregateInput;
}
