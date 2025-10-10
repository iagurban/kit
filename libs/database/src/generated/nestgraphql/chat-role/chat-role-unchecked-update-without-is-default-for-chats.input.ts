import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserChatPermissionsUncheckedUpdateManyWithoutRoleNestedInput } from '../user-chat-permissions/user-chat-permissions-unchecked-update-many-without-role-nested.input';
import { ChatRoleUpdatetagsInput } from './chat-role-updatetags.input';

@InputType()
export class ChatRoleUncheckedUpdateWithoutIsDefaultForChatsInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  chatId?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput;

  @Field(() => ChatRoleUpdatetagsInput, { nullable: true })
  tags?: ChatRoleUpdatetagsInput;

  @Field(() => GraphQLJSON, { nullable: true })
  permissions?: any;

  @Field(() => UserChatPermissionsUncheckedUpdateManyWithoutRoleNestedInput, { nullable: true })
  userPermissions?: UserChatPermissionsUncheckedUpdateManyWithoutRoleNestedInput;
}
