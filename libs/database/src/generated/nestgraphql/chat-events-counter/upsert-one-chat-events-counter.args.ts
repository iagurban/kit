import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { ChatEventsCounterCreateInput } from './chat-events-counter-create.input';
import { ChatEventsCounterUpdateInput } from './chat-events-counter-update.input';
import { ChatEventsCounterWhereUniqueInput } from './chat-events-counter-where-unique.input';

@ArgsType()
export class UpsertOneChatEventsCounterArgs {
  @Field(() => ChatEventsCounterWhereUniqueInput, { nullable: false })
  @Type(() => ChatEventsCounterWhereUniqueInput)
  where!: Prisma.AtLeast<ChatEventsCounterWhereUniqueInput, 'chatId'>;

  @Field(() => ChatEventsCounterCreateInput, { nullable: false })
  @Type(() => ChatEventsCounterCreateInput)
  create!: ChatEventsCounterCreateInput;

  @Field(() => ChatEventsCounterUpdateInput, { nullable: false })
  @Type(() => ChatEventsCounterUpdateInput)
  update!: ChatEventsCounterUpdateInput;
}
