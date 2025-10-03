import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatUpdateWithoutEventsCounterInput } from './chat-update-without-events-counter.input';
import { ChatWhereInput } from './chat-where.input';

@InputType()
export class ChatUpdateToOneWithWhereWithoutEventsCounterInput {
  @Field(() => ChatWhereInput, { nullable: true })
  @Type(() => ChatWhereInput)
  where?: ChatWhereInput;

  @Field(() => ChatUpdateWithoutEventsCounterInput, { nullable: false })
  @Type(() => ChatUpdateWithoutEventsCounterInput)
  data!: ChatUpdateWithoutEventsCounterInput;
}
