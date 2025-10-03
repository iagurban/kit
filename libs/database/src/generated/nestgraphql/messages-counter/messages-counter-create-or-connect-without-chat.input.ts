import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { MessagesCounterCreateWithoutChatInput } from './messages-counter-create-without-chat.input';
import { MessagesCounterWhereUniqueInput } from './messages-counter-where-unique.input';

@InputType()
export class MessagesCounterCreateOrConnectWithoutChatInput {
  @Field(() => MessagesCounterWhereUniqueInput, { nullable: false })
  @Type(() => MessagesCounterWhereUniqueInput)
  where!: Prisma.AtLeast<MessagesCounterWhereUniqueInput, 'chatId'>;

  @Field(() => MessagesCounterCreateWithoutChatInput, { nullable: false })
  @Type(() => MessagesCounterCreateWithoutChatInput)
  create!: MessagesCounterCreateWithoutChatInput;
}
