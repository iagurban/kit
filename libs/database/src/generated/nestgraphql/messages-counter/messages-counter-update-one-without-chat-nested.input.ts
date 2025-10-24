import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client/client';
import { MessagesCounterCreateOrConnectWithoutChatInput } from './messages-counter-create-or-connect-without-chat.input';
import { MessagesCounterCreateWithoutChatInput } from './messages-counter-create-without-chat.input';
import { MessagesCounterUpdateToOneWithWhereWithoutChatInput } from './messages-counter-update-to-one-with-where-without-chat.input';
import { MessagesCounterUpsertWithoutChatInput } from './messages-counter-upsert-without-chat.input';
import { MessagesCounterWhereInput } from './messages-counter-where.input';
import { MessagesCounterWhereUniqueInput } from './messages-counter-where-unique.input';

@InputType()
export class MessagesCounterUpdateOneWithoutChatNestedInput {
  @Field(() => MessagesCounterCreateWithoutChatInput, { nullable: true })
  @Type(() => MessagesCounterCreateWithoutChatInput)
  create?: MessagesCounterCreateWithoutChatInput;

  @Field(() => MessagesCounterCreateOrConnectWithoutChatInput, { nullable: true })
  @Type(() => MessagesCounterCreateOrConnectWithoutChatInput)
  connectOrCreate?: MessagesCounterCreateOrConnectWithoutChatInput;

  @Field(() => MessagesCounterUpsertWithoutChatInput, { nullable: true })
  @Type(() => MessagesCounterUpsertWithoutChatInput)
  upsert?: MessagesCounterUpsertWithoutChatInput;

  @Field(() => MessagesCounterWhereInput, { nullable: true })
  @Type(() => MessagesCounterWhereInput)
  disconnect?: MessagesCounterWhereInput;

  @Field(() => MessagesCounterWhereInput, { nullable: true })
  @Type(() => MessagesCounterWhereInput)
  delete?: MessagesCounterWhereInput;

  @Field(() => MessagesCounterWhereUniqueInput, { nullable: true })
  @Type(() => MessagesCounterWhereUniqueInput)
  connect?: Prisma.AtLeast<MessagesCounterWhereUniqueInput, 'chatId'>;

  @Field(() => MessagesCounterUpdateToOneWithWhereWithoutChatInput, { nullable: true })
  @Type(() => MessagesCounterUpdateToOneWithWhereWithoutChatInput)
  update?: MessagesCounterUpdateToOneWithWhereWithoutChatInput;
}
