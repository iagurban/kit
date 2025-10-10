import { Field, InputType } from '@nestjs/graphql';

import { ChatListRelationFilter } from '../chat/chat-list-relation-filter.input';
import { ChatEventListRelationFilter } from '../chat-event/chat-event-list-relation-filter.input';
import { ChatMemberListRelationFilter } from '../chat-member/chat-member-list-relation-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { RefreshTokenListRelationFilter } from '../refresh-token/refresh-token-list-relation-filter.input';
import { StoredFileListRelationFilter } from '../stored-file/stored-file-list-relation-filter.input';
import { UserChatPermissionsListRelationFilter } from '../user-chat-permissions/user-chat-permissions-list-relation-filter.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [UserWhereInput], { nullable: true })
  AND?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  OR?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  NOT?: Array<UserWhereInput>;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  abbrev?: StringNullableFilter;

  @Field(() => StringFilter, { nullable: true })
  passwordHash?: StringFilter;

  @Field(() => StoredFileListRelationFilter, { nullable: true })
  uploadedFiles?: StoredFileListRelationFilter;

  @Field(() => RefreshTokenListRelationFilter, { nullable: true })
  refreshTokens?: RefreshTokenListRelationFilter;

  @Field(() => ChatEventListRelationFilter, { nullable: true })
  chatEvents?: ChatEventListRelationFilter;

  @Field(() => UserChatPermissionsListRelationFilter, { nullable: true })
  chatsPermissions?: UserChatPermissionsListRelationFilter;

  @Field(() => ChatMemberListRelationFilter, { nullable: true })
  chatsMmbership?: ChatMemberListRelationFilter;

  @Field(() => ChatListRelationFilter, { nullable: true })
  ownChats?: ChatListRelationFilter;
}
