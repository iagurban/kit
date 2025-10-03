import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ChatEventsCounterWhereUniqueInput } from './chat-events-counter-where-unique.input';

@ArgsType()
export class FindUniqueChatEventsCounterOrThrowArgs {
  @Field(() => ChatEventsCounterWhereUniqueInput, { nullable: false })
  @Type(() => ChatEventsCounterWhereUniqueInput)
  where!: Prisma.AtLeast<ChatEventsCounterWhereUniqueInput, 'chatId'>;
}
