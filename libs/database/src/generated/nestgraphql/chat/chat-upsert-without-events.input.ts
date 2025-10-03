import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatCreateWithoutEventsInput } from './chat-create-without-events.input';
import { ChatUpdateWithoutEventsInput } from './chat-update-without-events.input';
import { ChatWhereInput } from './chat-where.input';

@InputType()
export class ChatUpsertWithoutEventsInput {
  @Field(() => ChatUpdateWithoutEventsInput, { nullable: false })
  @Type(() => ChatUpdateWithoutEventsInput)
  update!: ChatUpdateWithoutEventsInput;

  @Field(() => ChatCreateWithoutEventsInput, { nullable: false })
  @Type(() => ChatCreateWithoutEventsInput)
  create!: ChatCreateWithoutEventsInput;

  @Field(() => ChatWhereInput, { nullable: true })
  @Type(() => ChatWhereInput)
  where?: ChatWhereInput;
}
