import { Field, InputType } from '@nestjs/graphql';

import { ChatEventListRelationFilter } from '../chat-event/chat-event-list-relation-filter.input';
import { ChatEventsCounterNullableScalarRelationFilter } from '../chat-events-counter/chat-events-counter-nullable-scalar-relation-filter.input';
import { ChatMemberListRelationFilter } from '../chat-member/chat-member-list-relation-filter.input';
import { ChatRoleListRelationFilter } from '../chat-role/chat-role-list-relation-filter.input';
import { ChatRoleNullableScalarRelationFilter } from '../chat-role/chat-role-nullable-scalar-relation-filter.input';
import { MessagesCounterNullableScalarRelationFilter } from '../messages-counter/messages-counter-nullable-scalar-relation-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UuidNullableFilter } from '../prisma/uuid-nullable-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';
import { UserChatPermissionsListRelationFilter } from '../user-chat-permissions/user-chat-permissions-list-relation-filter.input';
import { ChatWhereInput } from './chat-where.input';

@InputType()
export class ChatWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => [ChatWhereInput], { nullable: true })
  AND?: Array<ChatWhereInput>;

  @Field(() => [ChatWhereInput], { nullable: true })
  OR?: Array<ChatWhereInput>;

  @Field(() => [ChatWhereInput], { nullable: true })
  NOT?: Array<ChatWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  title?: StringFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  bio?: StringNullableFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  avatar?: StringNullableFilter;

  @Field(() => UuidFilter, { nullable: true })
  ownerId?: UuidFilter;

  @Field(() => UuidNullableFilter, { nullable: true })
  defaultRoleId?: UuidNullableFilter;

  @Field(() => UserScalarRelationFilter, { nullable: true })
  owner?: UserScalarRelationFilter;

  @Field(() => ChatEventListRelationFilter, { nullable: true })
  events?: ChatEventListRelationFilter;

  @Field(() => ChatEventsCounterNullableScalarRelationFilter, { nullable: true })
  eventsCounter?: ChatEventsCounterNullableScalarRelationFilter;

  @Field(() => MessagesCounterNullableScalarRelationFilter, { nullable: true })
  messagesCounter?: MessagesCounterNullableScalarRelationFilter;

  @Field(() => ChatRoleNullableScalarRelationFilter, { nullable: true })
  defaultRole?: ChatRoleNullableScalarRelationFilter;

  @Field(() => UserChatPermissionsListRelationFilter, { nullable: true })
  userPermissions?: UserChatPermissionsListRelationFilter;

  @Field(() => ChatRoleListRelationFilter, { nullable: true })
  roles?: ChatRoleListRelationFilter;

  @Field(() => ChatMemberListRelationFilter, { nullable: true })
  members?: ChatMemberListRelationFilter;
}
