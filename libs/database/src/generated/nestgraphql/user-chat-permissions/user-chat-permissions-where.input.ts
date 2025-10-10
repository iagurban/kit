import { Field, InputType } from '@nestjs/graphql';

import { ChatScalarRelationFilter } from '../chat/chat-scalar-relation-filter.input';
import { ChatRoleNullableScalarRelationFilter } from '../chat-role/chat-role-nullable-scalar-relation-filter.input';
import { JsonNullableFilter } from '../prisma/json-nullable-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UuidNullableFilter } from '../prisma/uuid-nullable-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';

@InputType()
export class UserChatPermissionsWhereInput {
  @Field(() => [UserChatPermissionsWhereInput], { nullable: true })
  AND?: Array<UserChatPermissionsWhereInput>;

  @Field(() => [UserChatPermissionsWhereInput], { nullable: true })
  OR?: Array<UserChatPermissionsWhereInput>;

  @Field(() => [UserChatPermissionsWhereInput], { nullable: true })
  NOT?: Array<UserChatPermissionsWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  userId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  chatId?: UuidFilter;

  @Field(() => UuidNullableFilter, { nullable: true })
  roleId?: UuidNullableFilter;

  @Field(() => JsonNullableFilter, { nullable: true })
  permissions?: JsonNullableFilter;

  @Field(() => UserScalarRelationFilter, { nullable: true })
  user?: UserScalarRelationFilter;

  @Field(() => ChatScalarRelationFilter, { nullable: true })
  chat?: ChatScalarRelationFilter;

  @Field(() => ChatRoleNullableScalarRelationFilter, { nullable: true })
  role?: ChatRoleNullableScalarRelationFilter;
}
