import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserChatPermissionsCreateManyUserInput } from './user-chat-permissions-create-many-user.input';

@InputType()
export class UserChatPermissionsCreateManyUserInputEnvelope {
  @Field(() => [UserChatPermissionsCreateManyUserInput], { nullable: false })
  @Type(() => UserChatPermissionsCreateManyUserInput)
  data!: Array<UserChatPermissionsCreateManyUserInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
