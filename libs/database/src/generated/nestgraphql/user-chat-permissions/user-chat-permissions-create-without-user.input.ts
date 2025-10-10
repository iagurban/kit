import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatCreateNestedOneWithoutUserPermissionsInput } from '../chat/chat-create-nested-one-without-user-permissions.input';
import { ChatRoleCreateNestedOneWithoutUserPermissionsInput } from '../chat-role/chat-role-create-nested-one-without-user-permissions.input';

@InputType()
export class UserChatPermissionsCreateWithoutUserInput {
  @Field(() => GraphQLJSON, { nullable: true })
  permissions?: any;

  @Field(() => ChatCreateNestedOneWithoutUserPermissionsInput, { nullable: false })
  chat!: ChatCreateNestedOneWithoutUserPermissionsInput;

  @Field(() => ChatRoleCreateNestedOneWithoutUserPermissionsInput, { nullable: true })
  role?: ChatRoleCreateNestedOneWithoutUserPermissionsInput;
}
