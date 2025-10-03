import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatCreateWithoutEventsCounterInput } from './chat-create-without-events-counter.input';
import { ChatUpdateWithoutEventsCounterInput } from './chat-update-without-events-counter.input';
import { ChatWhereInput } from './chat-where.input';

@InputType()
export class ChatUpsertWithoutEventsCounterInput {
  @Field(() => ChatUpdateWithoutEventsCounterInput, { nullable: false })
  @Type(() => ChatUpdateWithoutEventsCounterInput)
  update!: ChatUpdateWithoutEventsCounterInput;

  @Field(() => ChatCreateWithoutEventsCounterInput, { nullable: false })
  @Type(() => ChatCreateWithoutEventsCounterInput)
  create!: ChatCreateWithoutEventsCounterInput;

  @Field(() => ChatWhereInput, { nullable: true })
  @Type(() => ChatWhereInput)
  where?: ChatWhereInput;
}
