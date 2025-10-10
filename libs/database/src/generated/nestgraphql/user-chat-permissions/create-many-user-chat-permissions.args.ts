import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserChatPermissionsCreateManyInput } from './user-chat-permissions-create-many.input';

@ArgsType()
export class CreateManyUserChatPermissionsArgs {
  @Field(() => [UserChatPermissionsCreateManyInput], { nullable: false })
  @Type(() => UserChatPermissionsCreateManyInput)
  data!: Array<UserChatPermissionsCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
