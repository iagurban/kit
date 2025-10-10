import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatCreateNestedOneWithoutUserPermissionsInput } from '../chat/chat-create-nested-one-without-user-permissions.input';
import { ChatRoleCreateNestedOneWithoutUserPermissionsInput } from '../chat-role/chat-role-create-nested-one-without-user-permissions.input';
import { UserCreateNestedOneWithoutChatsPermissionsInput } from '../user/user-create-nested-one-without-chats-permissions.input';

@InputType()
export class UserChatPermissionsCreateInput {
  @Field(() => GraphQLJSON, { nullable: true })
  permissions?: any;

  @Field(() => UserCreateNestedOneWithoutChatsPermissionsInput, { nullable: false })
  user!: UserCreateNestedOneWithoutChatsPermissionsInput;

  @Field(() => ChatCreateNestedOneWithoutUserPermissionsInput, { nullable: false })
  chat!: ChatCreateNestedOneWithoutUserPermissionsInput;

  @Field(() => ChatRoleCreateNestedOneWithoutUserPermissionsInput, { nullable: true })
  role?: ChatRoleCreateNestedOneWithoutUserPermissionsInput;
}
