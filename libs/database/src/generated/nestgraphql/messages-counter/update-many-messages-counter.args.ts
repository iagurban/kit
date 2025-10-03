import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MessagesCounterUpdateManyMutationInput } from './messages-counter-update-many-mutation.input';
import { MessagesCounterWhereInput } from './messages-counter-where.input';

@ArgsType()
export class UpdateManyMessagesCounterArgs {
  @Field(() => MessagesCounterUpdateManyMutationInput, { nullable: false })
  @Type(() => MessagesCounterUpdateManyMutationInput)
  data!: MessagesCounterUpdateManyMutationInput;

  @Field(() => MessagesCounterWhereInput, { nullable: true })
  @Type(() => MessagesCounterWhereInput)
  where?: MessagesCounterWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
