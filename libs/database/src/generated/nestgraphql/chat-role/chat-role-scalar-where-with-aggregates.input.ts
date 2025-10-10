import { Field, InputType } from '@nestjs/graphql';

import { EnumChatRoleTagNullableListFilter } from '../prisma/enum-chat-role-tag-nullable-list-filter.input';
import { JsonWithAggregatesFilter } from '../prisma/json-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class ChatRoleScalarWhereWithAggregatesInput {
  @Field(() => [ChatRoleScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ChatRoleScalarWhereWithAggregatesInput>;

  @Field(() => [ChatRoleScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ChatRoleScalarWhereWithAggregatesInput>;

  @Field(() => [ChatRoleScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ChatRoleScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  id?: UuidWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  chatId?: UuidWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;

  @Field(() => EnumChatRoleTagNullableListFilter, { nullable: true })
  tags?: EnumChatRoleTagNullableListFilter;

  @Field(() => JsonWithAggregatesFilter, { nullable: true })
  permissions?: JsonWithAggregatesFilter;
}
