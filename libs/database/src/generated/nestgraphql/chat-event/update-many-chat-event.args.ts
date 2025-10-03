import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatEventUpdateManyMutationInput } from './chat-event-update-many-mutation.input';
import { ChatEventWhereInput } from './chat-event-where.input';

@ArgsType()
export class UpdateManyChatEventArgs {
  @Field(() => ChatEventUpdateManyMutationInput, { nullable: false })
  @Type(() => ChatEventUpdateManyMutationInput)
  data!: ChatEventUpdateManyMutationInput;

  @Field(() => ChatEventWhereInput, { nullable: true })
  @Type(() => ChatEventWhereInput)
  where?: ChatEventWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
