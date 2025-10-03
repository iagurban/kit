import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MessagesCounterWhereUniqueInput } from './messages-counter-where-unique.input';

@ArgsType()
export class FindUniqueMessagesCounterOrThrowArgs {
  @Field(() => MessagesCounterWhereUniqueInput, { nullable: false })
  @Type(() => MessagesCounterWhereUniqueInput)
  where!: Prisma.AtLeast<MessagesCounterWhereUniqueInput, 'chatId'>;
}
