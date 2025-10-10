import { Field, ID, ObjectType } from '@nestjs/graphql';

import { ChatEvent } from '../chat-event/chat-event.model';
import { ChatEventsCounter } from '../chat-events-counter/chat-events-counter.model';
import { ChatMember } from '../chat-member/chat-member.model';
import { ChatRole } from '../chat-role/chat-role.model';
import { MessagesCounter } from '../messages-counter/messages-counter.model';
import { User } from '../user/user.model';
import { UserChatPermissions } from '../user-chat-permissions/user-chat-permissions.model';
import { ChatCount } from './chat-count.output';

@ObjectType()
export class Chat {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  bio!: string | null;

  @Field(() => String, { nullable: true })
  avatar!: string | null;

  @Field(() => String, { nullable: false })
  ownerId!: string;

  @Field(() => String, { nullable: true })
  defaultRoleId!: string | null;

  @Field(() => User, { nullable: false })
  owner?: User;

  @Field(() => [ChatEvent], { nullable: true })
  events?: Array<ChatEvent>;

  @Field(() => ChatEventsCounter, { nullable: true })
  eventsCounter?: ChatEventsCounter | null;

  @Field(() => MessagesCounter, { nullable: true })
  messagesCounter?: MessagesCounter | null;

  @Field(() => ChatRole, { nullable: true })
  defaultRole?: ChatRole | null;

  @Field(() => [UserChatPermissions], { nullable: true })
  userPermissions?: Array<UserChatPermissions>;

  @Field(() => [ChatRole], { nullable: true })
  roles?: Array<ChatRole>;

  @Field(() => [ChatMember], { nullable: true })
  members?: Array<ChatMember>;

  @Field(() => ChatCount, { nullable: false })
  _count?: ChatCount;
}
