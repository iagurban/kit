import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatEventsCounterUpdateInput } from './chat-events-counter-update.input';
import { ChatEventsCounterWhereUniqueInput } from './chat-events-counter-where-unique.input';

@ArgsType()
export class UpdateOneChatEventsCounterArgs {
  @Field(() => ChatEventsCounterUpdateInput, { nullable: false })
  @Type(() => ChatEventsCounterUpdateInput)
  data!: ChatEventsCounterUpdateInput;

  @Field(() => ChatEventsCounterWhereUniqueInput, { nullable: false })
  @Type(() => ChatEventsCounterWhereUniqueInput)
  where!: Prisma.AtLeast<ChatEventsCounterWhereUniqueInput, 'chatId'>;
}
