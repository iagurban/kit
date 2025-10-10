import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ChatRoleCreateWithoutUserPermissionsInput } from './chat-role-create-without-user-permissions.input';
import { ChatRoleUpdateWithoutUserPermissionsInput } from './chat-role-update-without-user-permissions.input';
import { ChatRoleWhereInput } from './chat-role-where.input';

@InputType()
export class ChatRoleUpsertWithoutUserPermissionsInput {
  @Field(() => ChatRoleUpdateWithoutUserPermissionsInput, { nullable: false })
  @Type(() => ChatRoleUpdateWithoutUserPermissionsInput)
  update!: ChatRoleUpdateWithoutUserPermissionsInput;

  @Field(() => ChatRoleCreateWithoutUserPermissionsInput, { nullable: false })
  @Type(() => ChatRoleCreateWithoutUserPermissionsInput)
  create!: ChatRoleCreateWithoutUserPermissionsInput;

  @Field(() => ChatRoleWhereInput, { nullable: true })
  @Type(() => ChatRoleWhereInput)
  where?: ChatRoleWhereInput;
}
