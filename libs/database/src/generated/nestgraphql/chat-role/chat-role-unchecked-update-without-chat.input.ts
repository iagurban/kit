import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { ChatUncheckedUpdateManyWithoutDefaultRoleNestedInput } from '../chat/chat-unchecked-update-many-without-default-role-nested.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserChatPermissionsUncheckedUpdateManyWithoutRoleNestedInput } from '../user-chat-permissions/user-chat-permissions-unchecked-update-many-without-role-nested.input';
import { ChatRoleUpdatetagsInput } from './chat-role-updatetags.input';

@InputType()
export class ChatRoleUncheckedUpdateWithoutChatInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput;

  @Field(() => ChatRoleUpdatetagsInput, { nullable: true })
  tags?: ChatRoleUpdatetagsInput;

  @Field(() => GraphQLJSON, { nullable: true })
  permissions?: any;

  @Field(() => ChatUncheckedUpdateManyWithoutDefaultRoleNestedInput, { nullable: true })
  isDefaultForChats?: ChatUncheckedUpdateManyWithoutDefaultRoleNestedInput;

  @Field(() => UserChatPermissionsUncheckedUpdateManyWithoutRoleNestedInput, { nullable: true })
  userPermissions?: UserChatPermissionsUncheckedUpdateManyWithoutRoleNestedInput;
}
