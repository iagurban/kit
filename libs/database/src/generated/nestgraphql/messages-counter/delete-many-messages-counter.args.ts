import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MessagesCounterWhereInput } from './messages-counter-where.input';

@ArgsType()
export class DeleteManyMessagesCounterArgs {
  @Field(() => MessagesCounterWhereInput, { nullable: true })
  @Type(() => MessagesCounterWhereInput)
  where?: MessagesCounterWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
