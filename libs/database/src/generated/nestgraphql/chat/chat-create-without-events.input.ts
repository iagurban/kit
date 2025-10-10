import { Field, InputType } from '@nestjs/graphql';

import { ChatEventsCounterCreateNestedOneWithoutChatInput } from '../chat-events-counter/chat-events-counter-create-nested-one-without-chat.input';
import { ChatMemberCreateNestedManyWithoutChatInput } from '../chat-member/chat-member-create-nested-many-without-chat.input';
import { ChatRoleCreateNestedManyWithoutChatInput } from '../chat-role/chat-role-create-nested-many-without-chat.input';
import { ChatRoleCreateNestedOneWithoutIsDefaultForChatsInput } from '../chat-role/chat-role-create-nested-one-without-is-default-for-chats.input';
import { MessagesCounterCreateNestedOneWithoutChatInput } from '../messages-counter/messages-counter-create-nested-one-without-chat.input';
import { UserCreateNestedOneWithoutOwnChatsInput } from '../user/user-create-nested-one-without-own-chats.input';
import { UserChatPermissionsCreateNestedManyWithoutChatInput } from '../user-chat-permissions/user-chat-permissions-create-nested-many-without-chat.input';

@InputType()
export class ChatCreateWithoutEventsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => UserCreateNestedOneWithoutOwnChatsInput, { nullable: false })
  owner!: UserCreateNestedOneWithoutOwnChatsInput;

  @Field(() => ChatEventsCounterCreateNestedOneWithoutChatInput, { nullable: true })
  eventsCounter?: ChatEventsCounterCreateNestedOneWithoutChatInput;

  @Field(() => MessagesCounterCreateNestedOneWithoutChatInput, { nullable: true })
  messagesCounter?: MessagesCounterCreateNestedOneWithoutChatInput;

  @Field(() => ChatRoleCreateNestedOneWithoutIsDefaultForChatsInput, { nullable: true })
  defaultRole?: ChatRoleCreateNestedOneWithoutIsDefaultForChatsInput;

  @Field(() => UserChatPermissionsCreateNestedManyWithoutChatInput, { nullable: true })
  userPermissions?: UserChatPermissionsCreateNestedManyWithoutChatInput;

  @Field(() => ChatRoleCreateNestedManyWithoutChatInput, { nullable: true })
  roles?: ChatRoleCreateNestedManyWithoutChatInput;

  @Field(() => ChatMemberCreateNestedManyWithoutChatInput, { nullable: true })
  members?: ChatMemberCreateNestedManyWithoutChatInput;
}
