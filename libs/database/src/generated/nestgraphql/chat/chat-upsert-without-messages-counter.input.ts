import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatCreateWithoutMessagesCounterInput } from './chat-create-without-messages-counter.input';
import { ChatUpdateWithoutMessagesCounterInput } from './chat-update-without-messages-counter.input';
import { ChatWhereInput } from './chat-where.input';

@InputType()
export class ChatUpsertWithoutMessagesCounterInput {
  @Field(() => ChatUpdateWithoutMessagesCounterInput, { nullable: false })
  @Type(() => ChatUpdateWithoutMessagesCounterInput)
  update!: ChatUpdateWithoutMessagesCounterInput;

  @Field(() => ChatCreateWithoutMessagesCounterInput, { nullable: false })
  @Type(() => ChatCreateWithoutMessagesCounterInput)
  create!: ChatCreateWithoutMessagesCounterInput;

  @Field(() => ChatWhereInput, { nullable: true })
  @Type(() => ChatWhereInput)
  where?: ChatWhereInput;
}
