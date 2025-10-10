import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatCreateNestedManyWithoutDefaultRoleInput } from '../chat/chat-create-nested-many-without-default-role.input';
import { UserChatPermissionsCreateNestedManyWithoutRoleInput } from '../user-chat-permissions/user-chat-permissions-create-nested-many-without-role.input';
import { ChatRoleCreatetagsInput } from './chat-role-createtags.input';

@InputType()
export class ChatRoleCreateWithoutChatInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ChatRoleCreatetagsInput, { nullable: true })
  tags?: ChatRoleCreatetagsInput;

  @Field(() => GraphQLJSON, { nullable: false })
  permissions!: any;

  @Field(() => ChatCreateNestedManyWithoutDefaultRoleInput, { nullable: true })
  isDefaultForChats?: ChatCreateNestedManyWithoutDefaultRoleInput;

  @Field(() => UserChatPermissionsCreateNestedManyWithoutRoleInput, { nullable: true })
  userPermissions?: UserChatPermissionsCreateNestedManyWithoutRoleInput;
}
