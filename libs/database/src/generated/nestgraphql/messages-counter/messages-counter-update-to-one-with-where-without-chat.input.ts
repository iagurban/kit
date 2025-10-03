import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MessagesCounterUpdateWithoutChatInput } from './messages-counter-update-without-chat.input';
import { MessagesCounterWhereInput } from './messages-counter-where.input';

@InputType()
export class MessagesCounterUpdateToOneWithWhereWithoutChatInput {
  @Field(() => MessagesCounterWhereInput, { nullable: true })
  @Type(() => MessagesCounterWhereInput)
  where?: MessagesCounterWhereInput;

  @Field(() => MessagesCounterUpdateWithoutChatInput, { nullable: false })
  @Type(() => MessagesCounterUpdateWithoutChatInput)
  data!: MessagesCounterUpdateWithoutChatInput;
}
