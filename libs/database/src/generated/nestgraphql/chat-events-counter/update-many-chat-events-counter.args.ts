import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventsCounterUpdateManyMutationInput } from './chat-events-counter-update-many-mutation.input';
import { ChatEventsCounterWhereInput } from './chat-events-counter-where.input';

@ArgsType()
export class UpdateManyChatEventsCounterArgs {
  @Field(() => ChatEventsCounterUpdateManyMutationInput, { nullable: false })
  @Type(() => ChatEventsCounterUpdateManyMutationInput)
  data!: ChatEventsCounterUpdateManyMutationInput;

  @Field(() => ChatEventsCounterWhereInput, { nullable: true })
  @Type(() => ChatEventsCounterWhereInput)
  where?: ChatEventsCounterWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
