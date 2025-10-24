import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { MessagesCounterCreateInput } from './messages-counter-create.input';
import { MessagesCounterUpdateInput } from './messages-counter-update.input';
import { MessagesCounterWhereUniqueInput } from './messages-counter-where-unique.input';

@ArgsType()
export class UpsertOneMessagesCounterArgs {
  @Field(() => MessagesCounterWhereUniqueInput, { nullable: false })
  @Type(() => MessagesCounterWhereUniqueInput)
  where!: Prisma.AtLeast<MessagesCounterWhereUniqueInput, 'chatId'>;

  @Field(() => MessagesCounterCreateInput, { nullable: false })
  @Type(() => MessagesCounterCreateInput)
  create!: MessagesCounterCreateInput;

  @Field(() => MessagesCounterUpdateInput, { nullable: false })
  @Type(() => MessagesCounterUpdateInput)
  update!: MessagesCounterUpdateInput;
}
