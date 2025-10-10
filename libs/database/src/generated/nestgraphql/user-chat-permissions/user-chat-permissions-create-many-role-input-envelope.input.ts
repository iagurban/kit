import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserChatPermissionsCreateManyRoleInput } from './user-chat-permissions-create-many-role.input';

@InputType()
export class UserChatPermissionsCreateManyRoleInputEnvelope {
  @Field(() => [UserChatPermissionsCreateManyRoleInput], { nullable: false })
  @Type(() => UserChatPermissionsCreateManyRoleInput)
  data!: Array<UserChatPermissionsCreateManyRoleInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
