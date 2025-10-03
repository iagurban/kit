import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MessagesCounterUpdateInput } from './messages-counter-update.input';
import { MessagesCounterWhereUniqueInput } from './messages-counter-where-unique.input';

@ArgsType()
export class UpdateOneMessagesCounterArgs {
  @Field(() => MessagesCounterUpdateInput, { nullable: false })
  @Type(() => MessagesCounterUpdateInput)
  data!: MessagesCounterUpdateInput;

  @Field(() => MessagesCounterWhereUniqueInput, { nullable: false })
  @Type(() => MessagesCounterWhereUniqueInput)
  where!: Prisma.AtLeast<MessagesCounterWhereUniqueInput, 'chatId'>;
}
