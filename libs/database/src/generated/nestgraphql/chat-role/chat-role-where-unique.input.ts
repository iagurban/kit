import { Field, InputType } from '@nestjs/graphql';

import { ChatListRelationFilter } from '../chat/chat-list-relation-filter.input';
import { ChatScalarRelationFilter } from '../chat/chat-scalar-relation-filter.input';
import { EnumChatRoleTagNullableListFilter } from '../prisma/enum-chat-role-tag-nullable-list-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UserChatPermissionsListRelationFilter } from '../user-chat-permissions/user-chat-permissions-list-relation-filter.input';
import { ChatRoleChatIdNameCompoundUniqueInput } from './chat-role-chat-id-name-compound-unique.input';
import { ChatRoleWhereInput } from './chat-role-where.input';

@InputType()
export class ChatRoleWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => ChatRoleChatIdNameCompoundUniqueInput, { nullable: true })
  chatId_name?: ChatRoleChatIdNameCompoundUniqueInput;

  @Field(() => [ChatRoleWhereInput], { nullable: true })
  AND?: Array<ChatRoleWhereInput>;

  @Field(() => [ChatRoleWhereInput], { nullable: true })
  OR?: Array<ChatRoleWhereInput>;

  @Field(() => [ChatRoleWhereInput], { nullable: true })
  NOT?: Array<ChatRoleWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  chatId?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => EnumChatRoleTagNullableListFilter, { nullable: true })
  tags?: EnumChatRoleTagNullableListFilter;

  @Field(() => JsonFilter, { nullable: true })
  permissions?: JsonFilter;

  @Field(() => ChatScalarRelationFilter, { nullable: true })
  chat?: ChatScalarRelationFilter;

  @Field(() => ChatListRelationFilter, { nullable: true })
  isDefaultForChats?: ChatListRelationFilter;

  @Field(() => UserChatPermissionsListRelationFilter, { nullable: true })
  userPermissions?: UserChatPermissionsListRelationFilter;
}
