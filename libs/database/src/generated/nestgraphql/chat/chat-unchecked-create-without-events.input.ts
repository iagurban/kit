import { Field, InputType } from '@nestjs/graphql';

import { ChatEventsCounterUncheckedCreateNestedOneWithoutChatInput } from '../chat-events-counter/chat-events-counter-unchecked-create-nested-one-without-chat.input';
import { ChatMemberUncheckedCreateNestedManyWithoutChatInput } from '../chat-member/chat-member-unchecked-create-nested-many-without-chat.input';
import { ChatRoleUncheckedCreateNestedManyWithoutChatInput } from '../chat-role/chat-role-unchecked-create-nested-many-without-chat.input';
import { MessagesCounterUncheckedCreateNestedOneWithoutChatInput } from '../messages-counter/messages-counter-unchecked-create-nested-one-without-chat.input';
import { UserChatPermissionsUncheckedCreateNestedManyWithoutChatInput } from '../user-chat-permissions/user-chat-permissions-unchecked-create-nested-many-without-chat.input';

@InputType()
export class ChatUncheckedCreateWithoutEventsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: false })
  ownerId!: string;

  @Field(() => String, { nullable: true })
  defaultRoleId?: string;

  @Field(() => ChatEventsCounterUncheckedCreateNestedOneWithoutChatInput, { nullable: true })
  eventsCounter?: ChatEventsCounterUncheckedCreateNestedOneWithoutChatInput;

  @Field(() => MessagesCounterUncheckedCreateNestedOneWithoutChatInput, { nullable: true })
  messagesCounter?: MessagesCounterUncheckedCreateNestedOneWithoutChatInput;

  @Field(() => UserChatPermissionsUncheckedCreateNestedManyWithoutChatInput, { nullable: true })
  userPermissions?: UserChatPermissionsUncheckedCreateNestedManyWithoutChatInput;

  @Field(() => ChatRoleUncheckedCreateNestedManyWithoutChatInput, { nullable: true })
  roles?: ChatRoleUncheckedCreateNestedManyWithoutChatInput;

  @Field(() => ChatMemberUncheckedCreateNestedManyWithoutChatInput, { nullable: true })
  members?: ChatMemberUncheckedCreateNestedManyWithoutChatInput;
}
