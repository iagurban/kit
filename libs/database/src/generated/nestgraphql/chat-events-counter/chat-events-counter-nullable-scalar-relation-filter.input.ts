import { Field, InputType } from '@nestjs/graphql';

import { ChatEventsCounterWhereInput } from './chat-events-counter-where.input';

@InputType()
export class ChatEventsCounterNullableScalarRelationFilter {
  @Field(() => ChatEventsCounterWhereInput, { nullable: true })
  is?: ChatEventsCounterWhereInput;

  @Field(() => ChatEventsCounterWhereInput, { nullable: true })
  isNot?: ChatEventsCounterWhereInput;
}
