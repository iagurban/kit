import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventsCounterCreateInput } from './chat-events-counter-create.input';

@ArgsType()
export class CreateOneChatEventsCounterArgs {
  @Field(() => ChatEventsCounterCreateInput, { nullable: false })
  @Type(() => ChatEventsCounterCreateInput)
  data!: ChatEventsCounterCreateInput;
}
