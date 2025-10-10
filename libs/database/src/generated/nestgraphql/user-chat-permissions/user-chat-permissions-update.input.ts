import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatUpdateOneRequiredWithoutUserPermissionsNestedInput } from '../chat/chat-update-one-required-without-user-permissions-nested.input';
import { ChatRoleUpdateOneWithoutUserPermissionsNestedInput } from '../chat-role/chat-role-update-one-without-user-permissions-nested.input';
import { UserUpdateOneRequiredWithoutChatsPermissionsNestedInput } from '../user/user-update-one-required-without-chats-permissions-nested.input';

@InputType()
export class UserChatPermissionsUpdateInput {
  @Field(() => GraphQLJSON, { nullable: true })
  permissions?: any;

  @Field(() => UserUpdateOneRequiredWithoutChatsPermissionsNestedInput, { nullable: true })
  user?: UserUpdateOneRequiredWithoutChatsPermissionsNestedInput;

  @Field(() => ChatUpdateOneRequiredWithoutUserPermissionsNestedInput, { nullable: true })
  chat?: ChatUpdateOneRequiredWithoutUserPermissionsNestedInput;

  @Field(() => ChatRoleUpdateOneWithoutUserPermissionsNestedInput, { nullable: true })
  role?: ChatRoleUpdateOneWithoutUserPermissionsNestedInput;
}
