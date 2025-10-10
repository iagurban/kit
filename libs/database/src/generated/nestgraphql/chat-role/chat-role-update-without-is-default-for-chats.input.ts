import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatUpdateOneRequiredWithoutRolesNestedInput } from '../chat/chat-update-one-required-without-roles-nested.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserChatPermissionsUpdateManyWithoutRoleNestedInput } from '../user-chat-permissions/user-chat-permissions-update-many-without-role-nested.input';
import { ChatRoleUpdatetagsInput } from './chat-role-updatetags.input';

@InputType()
export class ChatRoleUpdateWithoutIsDefaultForChatsInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput;

  @Field(() => ChatRoleUpdatetagsInput, { nullable: true })
  tags?: ChatRoleUpdatetagsInput;

  @Field(() => GraphQLJSON, { nullable: true })
  permissions?: any;

  @Field(() => ChatUpdateOneRequiredWithoutRolesNestedInput, { nullable: true })
  chat?: ChatUpdateOneRequiredWithoutRolesNestedInput;

  @Field(() => UserChatPermissionsUpdateManyWithoutRoleNestedInput, { nullable: true })
  userPermissions?: UserChatPermissionsUpdateManyWithoutRoleNestedInput;
}
