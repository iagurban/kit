import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { UserChatPermissionsCreateManyChatInput } from './user-chat-permissions-create-many-chat.input';

@InputType()
export class UserChatPermissionsCreateManyChatInputEnvelope {
  @Field(() => [UserChatPermissionsCreateManyChatInput], { nullable: false })
  @Type(() => UserChatPermissionsCreateManyChatInput)
  data!: Array<UserChatPermissionsCreateManyChatInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
