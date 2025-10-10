import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserChatPermissionsCreateInput } from './user-chat-permissions-create.input';

@ArgsType()
export class CreateOneUserChatPermissionsArgs {
  @Field(() => UserChatPermissionsCreateInput, { nullable: false })
  @Type(() => UserChatPermissionsCreateInput)
  data!: UserChatPermissionsCreateInput;
}
