import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatUncheckedCreateNestedManyWithoutDefaultRoleInput } from '../chat/chat-unchecked-create-nested-many-without-default-role.input';
import { UserChatPermissionsUncheckedCreateNestedManyWithoutRoleInput } from '../user-chat-permissions/user-chat-permissions-unchecked-create-nested-many-without-role.input';
import { ChatRoleCreatetagsInput } from './chat-role-createtags.input';

@InputType()
export class ChatRoleUncheckedCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  chatId!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => ChatRoleCreatetagsInput, { nullable: true })
  tags?: ChatRoleCreatetagsInput;

  @Field(() => GraphQLJSON, { nullable: false })
  permissions!: any;

  @Field(() => ChatUncheckedCreateNestedManyWithoutDefaultRoleInput, { nullable: true })
  isDefaultForChats?: ChatUncheckedCreateNestedManyWithoutDefaultRoleInput;

  @Field(() => UserChatPermissionsUncheckedCreateNestedManyWithoutRoleInput, { nullable: true })
  userPermissions?: UserChatPermissionsUncheckedCreateNestedManyWithoutRoleInput;
}
