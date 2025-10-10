import { Field, InputType } from '@nestjs/graphql';

import { ChatEventUncheckedUpdateManyWithoutChatNestedInput } from '../chat-event/chat-event-unchecked-update-many-without-chat-nested.input';
import { ChatEventsCounterUncheckedUpdateOneWithoutChatNestedInput } from '../chat-events-counter/chat-events-counter-unchecked-update-one-without-chat-nested.input';
import { ChatMemberUncheckedUpdateManyWithoutChatNestedInput } from '../chat-member/chat-member-unchecked-update-many-without-chat-nested.input';
import { ChatRoleUncheckedUpdateManyWithoutChatNestedInput } from '../chat-role/chat-role-unchecked-update-many-without-chat-nested.input';
import { MessagesCounterUncheckedUpdateOneWithoutChatNestedInput } from '../messages-counter/messages-counter-unchecked-update-one-without-chat-nested.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UserChatPermissionsUncheckedUpdateManyWithoutChatNestedInput } from '../user-chat-permissions/user-chat-permissions-unchecked-update-many-without-chat-nested.input';

@InputType()
export class ChatUncheckedUpdateWithoutDefaultRoleInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  title?: StringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  bio?: NullableStringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  avatar?: NullableStringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  ownerId?: StringFieldUpdateOperationsInput;

  @Field(() => ChatEventUncheckedUpdateManyWithoutChatNestedInput, { nullable: true })
  events?: ChatEventUncheckedUpdateManyWithoutChatNestedInput;

  @Field(() => ChatEventsCounterUncheckedUpdateOneWithoutChatNestedInput, { nullable: true })
  eventsCounter?: ChatEventsCounterUncheckedUpdateOneWithoutChatNestedInput;

  @Field(() => MessagesCounterUncheckedUpdateOneWithoutChatNestedInput, { nullable: true })
  messagesCounter?: MessagesCounterUncheckedUpdateOneWithoutChatNestedInput;

  @Field(() => UserChatPermissionsUncheckedUpdateManyWithoutChatNestedInput, { nullable: true })
  userPermissions?: UserChatPermissionsUncheckedUpdateManyWithoutChatNestedInput;

  @Field(() => ChatRoleUncheckedUpdateManyWithoutChatNestedInput, { nullable: true })
  roles?: ChatRoleUncheckedUpdateManyWithoutChatNestedInput;

  @Field(() => ChatMemberUncheckedUpdateManyWithoutChatNestedInput, { nullable: true })
  members?: ChatMemberUncheckedUpdateManyWithoutChatNestedInput;
}
