import { Field, InputType } from '@nestjs/graphql';

import { ChatEventUpdateManyWithoutChatNestedInput } from '../chat-event/chat-event-update-many-without-chat-nested.input';
import { ChatEventsCounterUpdateOneWithoutChatNestedInput } from '../chat-events-counter/chat-events-counter-update-one-without-chat-nested.input';
import { ChatMemberUpdateManyWithoutChatNestedInput } from '../chat-member/chat-member-update-many-without-chat-nested.input';
import { ChatRoleUpdateManyWithoutChatNestedInput } from '../chat-role/chat-role-update-many-without-chat-nested.input';
import { ChatRoleUpdateOneWithoutIsDefaultForChatsNestedInput } from '../chat-role/chat-role-update-one-without-is-default-for-chats-nested.input';
import { MessagesCounterUpdateOneWithoutChatNestedInput } from '../messages-counter/messages-counter-update-one-without-chat-nested.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserUpdateOneRequiredWithoutOwnChatsNestedInput } from '../user/user-update-one-required-without-own-chats-nested.input';
import { UserChatPermissionsUpdateManyWithoutChatNestedInput } from '../user-chat-permissions/user-chat-permissions-update-many-without-chat-nested.input';

@InputType()
export class ChatUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  title?: StringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  bio?: NullableStringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  avatar?: NullableStringFieldUpdateOperationsInput;

  @Field(() => UserUpdateOneRequiredWithoutOwnChatsNestedInput, { nullable: true })
  owner?: UserUpdateOneRequiredWithoutOwnChatsNestedInput;

  @Field(() => ChatEventUpdateManyWithoutChatNestedInput, { nullable: true })
  events?: ChatEventUpdateManyWithoutChatNestedInput;

  @Field(() => ChatEventsCounterUpdateOneWithoutChatNestedInput, { nullable: true })
  eventsCounter?: ChatEventsCounterUpdateOneWithoutChatNestedInput;

  @Field(() => MessagesCounterUpdateOneWithoutChatNestedInput, { nullable: true })
  messagesCounter?: MessagesCounterUpdateOneWithoutChatNestedInput;

  @Field(() => ChatRoleUpdateOneWithoutIsDefaultForChatsNestedInput, { nullable: true })
  defaultRole?: ChatRoleUpdateOneWithoutIsDefaultForChatsNestedInput;

  @Field(() => UserChatPermissionsUpdateManyWithoutChatNestedInput, { nullable: true })
  userPermissions?: UserChatPermissionsUpdateManyWithoutChatNestedInput;

  @Field(() => ChatRoleUpdateManyWithoutChatNestedInput, { nullable: true })
  roles?: ChatRoleUpdateManyWithoutChatNestedInput;

  @Field(() => ChatMemberUpdateManyWithoutChatNestedInput, { nullable: true })
  members?: ChatMemberUpdateManyWithoutChatNestedInput;
}
