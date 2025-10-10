import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatCreateNestedOneWithoutRolesInput } from '../chat/chat-create-nested-one-without-roles.input';
import { UserChatPermissionsCreateNestedManyWithoutRoleInput } from '../user-chat-permissions/user-chat-permissions-create-nested-many-without-role.input';
import { ChatRoleCreatetagsInput } from './chat-role-createtags.input';

@InputType()
export class ChatRoleCreateWithoutIsDefaultForChatsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ChatRoleCreatetagsInput, { nullable: true })
  tags?: ChatRoleCreatetagsInput;

  @Field(() => GraphQLJSON, { nullable: false })
  permissions!: any;

  @Field(() => ChatCreateNestedOneWithoutRolesInput, { nullable: false })
  chat!: ChatCreateNestedOneWithoutRolesInput;

  @Field(() => UserChatPermissionsCreateNestedManyWithoutRoleInput, { nullable: true })
  userPermissions?: UserChatPermissionsCreateNestedManyWithoutRoleInput;
}
