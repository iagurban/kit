import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatEventsCounterOrderByWithRelationInput } from './chat-events-counter-order-by-with-relation.input';
import { ChatEventsCounterScalarFieldEnum } from './chat-events-counter-scalar-field.enum';
import { ChatEventsCounterWhereInput } from './chat-events-counter-where.input';
import { ChatEventsCounterWhereUniqueInput } from './chat-events-counter-where-unique.input';

@ArgsType()
export class FindFirstChatEventsCounterArgs {
  @Field(() => ChatEventsCounterWhereInput, { nullable: true })
  @Type(() => ChatEventsCounterWhereInput)
  where?: ChatEventsCounterWhereInput;

  @Field(() => [ChatEventsCounterOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ChatEventsCounterOrderByWithRelationInput>;

  @Field(() => ChatEventsCounterWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ChatEventsCounterWhereUniqueInput, 'chatId'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ChatEventsCounterScalarFieldEnum], { nullable: true })
  distinct?: Array<`${ChatEventsCounterScalarFieldEnum}`>;
}
