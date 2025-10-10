import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { UserChatPermissionsUncheckedCreateNestedManyWithoutRoleInput } from '../user-chat-permissions/user-chat-permissions-unchecked-create-nested-many-without-role.input';
import { ChatRoleCreatetagsInput } from './chat-role-createtags.input';

@InputType()
export class ChatRoleUncheckedCreateWithoutIsDefaultForChatsInput {
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

  @Field(() => UserChatPermissionsUncheckedCreateNestedManyWithoutRoleInput, { nullable: true })
  userPermissions?: UserChatPermissionsUncheckedCreateNestedManyWithoutRoleInput;
}
