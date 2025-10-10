import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatRoleUpdateManyMutationInput } from './chat-role-update-many-mutation.input';
import { ChatRoleWhereInput } from './chat-role-where.input';

@ArgsType()
export class UpdateManyChatRoleArgs {
  @Field(() => ChatRoleUpdateManyMutationInput, { nullable: false })
  @Type(() => ChatRoleUpdateManyMutationInput)
  data!: ChatRoleUpdateManyMutationInput;

  @Field(() => ChatRoleWhereInput, { nullable: true })
  @Type(() => ChatRoleWhereInput)
  where?: ChatRoleWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
