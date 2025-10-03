import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MessagesCounterCreateManyInput } from './messages-counter-create-many.input';

@ArgsType()
export class CreateManyMessagesCounterArgs {
  @Field(() => [MessagesCounterCreateManyInput], { nullable: false })
  @Type(() => MessagesCounterCreateManyInput)
  data!: Array<MessagesCounterCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
