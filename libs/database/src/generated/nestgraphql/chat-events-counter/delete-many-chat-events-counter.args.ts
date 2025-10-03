import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventsCounterWhereInput } from './chat-events-counter-where.input';

@ArgsType()
export class DeleteManyChatEventsCounterArgs {
  @Field(() => ChatEventsCounterWhereInput, { nullable: true })
  @Type(() => ChatEventsCounterWhereInput)
  where?: ChatEventsCounterWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
