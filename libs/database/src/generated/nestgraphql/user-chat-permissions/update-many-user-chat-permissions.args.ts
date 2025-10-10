import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserChatPermissionsUpdateManyMutationInput } from './user-chat-permissions-update-many-mutation.input';
import { UserChatPermissionsWhereInput } from './user-chat-permissions-where.input';

@ArgsType()
export class UpdateManyUserChatPermissionsArgs {
  @Field(() => UserChatPermissionsUpdateManyMutationInput, { nullable: false })
  @Type(() => UserChatPermissionsUpdateManyMutationInput)
  data!: UserChatPermissionsUpdateManyMutationInput;

  @Field(() => UserChatPermissionsWhereInput, { nullable: true })
  @Type(() => UserChatPermissionsWhereInput)
  where?: UserChatPermissionsWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
