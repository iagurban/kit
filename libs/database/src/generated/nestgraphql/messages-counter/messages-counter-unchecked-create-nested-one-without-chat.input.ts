import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { MessagesCounterCreateOrConnectWithoutChatInput } from './messages-counter-create-or-connect-without-chat.input';
import { MessagesCounterCreateWithoutChatInput } from './messages-counter-create-without-chat.input';
import { MessagesCounterWhereUniqueInput } from './messages-counter-where-unique.input';

@InputType()
export class MessagesCounterUncheckedCreateNestedOneWithoutChatInput {
  @Field(() => MessagesCounterCreateWithoutChatInput, { nullable: true })
  @Type(() => MessagesCounterCreateWithoutChatInput)
  create?: MessagesCounterCreateWithoutChatInput;

  @Field(() => MessagesCounterCreateOrConnectWithoutChatInput, { nullable: true })
  @Type(() => MessagesCounterCreateOrConnectWithoutChatInput)
  connectOrCreate?: MessagesCounterCreateOrConnectWithoutChatInput;

  @Field(() => MessagesCounterWhereUniqueInput, { nullable: true })
  @Type(() => MessagesCounterWhereUniqueInput)
  connect?: Prisma.AtLeast<MessagesCounterWhereUniqueInput, 'chatId'>;
}
