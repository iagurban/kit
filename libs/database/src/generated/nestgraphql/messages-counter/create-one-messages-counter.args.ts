import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MessagesCounterCreateInput } from './messages-counter-create.input';

@ArgsType()
export class CreateOneMessagesCounterArgs {
  @Field(() => MessagesCounterCreateInput, { nullable: false })
  @Type(() => MessagesCounterCreateInput)
  data!: MessagesCounterCreateInput;
}
