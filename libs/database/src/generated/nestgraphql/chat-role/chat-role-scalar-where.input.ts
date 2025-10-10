import { Field, InputType } from '@nestjs/graphql';

import { EnumChatRoleTagNullableListFilter } from '../prisma/enum-chat-role-tag-nullable-list-filter.input';
import { JsonFilter } from '../prisma/json-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class ChatRoleScalarWhereInput {
  @Field(() => [ChatRoleScalarWhereInput], { nullable: true })
  AND?: Array<ChatRoleScalarWhereInput>;

  @Field(() => [ChatRoleScalarWhereInput], { nullable: true })
  OR?: Array<ChatRoleScalarWhereInput>;

  @Field(() => [ChatRoleScalarWhereInput], { nullable: true })
  NOT?: Array<ChatRoleScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  chatId?: UuidFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => EnumChatRoleTagNullableListFilter, { nullable: true })
  tags?: EnumChatRoleTagNullableListFilter;

  @Field(() => JsonFilter, { nullable: true })
  permissions?: JsonFilter;
}
