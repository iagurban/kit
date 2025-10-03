import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MessagesCounterCreateWithoutChatInput } from './messages-counter-create-without-chat.input';
import { MessagesCounterUpdateWithoutChatInput } from './messages-counter-update-without-chat.input';
import { MessagesCounterWhereInput } from './messages-counter-where.input';

@InputType()
export class MessagesCounterUpsertWithoutChatInput {
  @Field(() => MessagesCounterUpdateWithoutChatInput, { nullable: false })
  @Type(() => MessagesCounterUpdateWithoutChatInput)
  update!: MessagesCounterUpdateWithoutChatInput;

  @Field(() => MessagesCounterCreateWithoutChatInput, { nullable: false })
  @Type(() => MessagesCounterCreateWithoutChatInput)
  create!: MessagesCounterCreateWithoutChatInput;

  @Field(() => MessagesCounterWhereInput, { nullable: true })
  @Type(() => MessagesCounterWhereInput)
  where?: MessagesCounterWhereInput;
}
