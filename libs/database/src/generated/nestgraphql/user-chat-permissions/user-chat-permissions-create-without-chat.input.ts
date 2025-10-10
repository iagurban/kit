import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatRoleCreateNestedOneWithoutUserPermissionsInput } from '../chat-role/chat-role-create-nested-one-without-user-permissions.input';
import { UserCreateNestedOneWithoutChatsPermissionsInput } from '../user/user-create-nested-one-without-chats-permissions.input';

@InputType()
export class UserChatPermissionsCreateWithoutChatInput {
  @Field(() => GraphQLJSON, { nullable: true })
  permissions?: any;

  @Field(() => UserCreateNestedOneWithoutChatsPermissionsInput, { nullable: false })
  user!: UserCreateNestedOneWithoutChatsPermissionsInput;

  @Field(() => ChatRoleCreateNestedOneWithoutUserPermissionsInput, { nullable: true })
  role?: ChatRoleCreateNestedOneWithoutUserPermissionsInput;
}
