import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatUpdateWithoutMessagesCounterInput } from './chat-update-without-messages-counter.input';
import { ChatWhereInput } from './chat-where.input';

@InputType()
export class ChatUpdateToOneWithWhereWithoutMessagesCounterInput {
  @Field(() => ChatWhereInput, { nullable: true })
  @Type(() => ChatWhereInput)
  where?: ChatWhereInput;

  @Field(() => ChatUpdateWithoutMessagesCounterInput, { nullable: false })
  @Type(() => ChatUpdateWithoutMessagesCounterInput)
  data!: ChatUpdateWithoutMessagesCounterInput;
}
