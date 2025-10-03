import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatUpdateWithoutEventsInput } from './chat-update-without-events.input';
import { ChatWhereInput } from './chat-where.input';

@InputType()
export class ChatUpdateToOneWithWhereWithoutEventsInput {
  @Field(() => ChatWhereInput, { nullable: true })
  @Type(() => ChatWhereInput)
  where?: ChatWhereInput;

  @Field(() => ChatUpdateWithoutEventsInput, { nullable: false })
  @Type(() => ChatUpdateWithoutEventsInput)
  data!: ChatUpdateWithoutEventsInput;
}
