import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatRoleUpdateWithoutUserPermissionsInput } from './chat-role-update-without-user-permissions.input';
import { ChatRoleWhereInput } from './chat-role-where.input';

@InputType()
export class ChatRoleUpdateToOneWithWhereWithoutUserPermissionsInput {
  @Field(() => ChatRoleWhereInput, { nullable: true })
  @Type(() => ChatRoleWhereInput)
  where?: ChatRoleWhereInput;

  @Field(() => ChatRoleUpdateWithoutUserPermissionsInput, { nullable: false })
  @Type(() => ChatRoleUpdateWithoutUserPermissionsInput)
  data!: ChatRoleUpdateWithoutUserPermissionsInput;
}
