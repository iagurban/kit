import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatMemberUpdateManyMutationInput } from './chat-member-update-many-mutation.input';
import { ChatMemberWhereInput } from './chat-member-where.input';

@ArgsType()
export class UpdateManyChatMemberArgs {
  @Field(() => ChatMemberUpdateManyMutationInput, { nullable: false })
  @Type(() => ChatMemberUpdateManyMutationInput)
  data!: ChatMemberUpdateManyMutationInput;

  @Field(() => ChatMemberWhereInput, { nullable: true })
  @Type(() => ChatMemberWhereInput)
  where?: ChatMemberWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
