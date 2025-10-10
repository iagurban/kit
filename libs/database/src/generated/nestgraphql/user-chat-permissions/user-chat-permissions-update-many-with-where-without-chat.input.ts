import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserChatPermissionsScalarWhereInput } from './user-chat-permissions-scalar-where.input';
import { UserChatPermissionsUpdateManyMutationInput } from './user-chat-permissions-update-many-mutation.input';

@InputType()
export class UserChatPermissionsUpdateManyWithWhereWithoutChatInput {
  @Field(() => UserChatPermissionsScalarWhereInput, { nullable: false })
  @Type(() => UserChatPermissionsScalarWhereInput)
  where!: UserChatPermissionsScalarWhereInput;

  @Field(() => UserChatPermissionsUpdateManyMutationInput, { nullable: false })
  @Type(() => UserChatPermissionsUpdateManyMutationInput)
  data!: UserChatPermissionsUpdateManyMutationInput;
}
