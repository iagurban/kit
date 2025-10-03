import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatUpdateManyMutationInput } from './chat-update-many-mutation.input';
import { ChatWhereInput } from './chat-where.input';

@ArgsType()
export class UpdateManyChatArgs {
  @Field(() => ChatUpdateManyMutationInput, { nullable: false })
  @Type(() => ChatUpdateManyMutationInput)
  data!: ChatUpdateManyMutationInput;

  @Field(() => ChatWhereInput, { nullable: true })
  @Type(() => ChatWhereInput)
  where?: ChatWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
