import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventsCounterCreateManyInput } from './chat-events-counter-create-many.input';

@ArgsType()
export class CreateManyChatEventsCounterArgs {
  @Field(() => [ChatEventsCounterCreateManyInput], { nullable: false })
  @Type(() => ChatEventsCounterCreateManyInput)
  data!: Array<ChatEventsCounterCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
