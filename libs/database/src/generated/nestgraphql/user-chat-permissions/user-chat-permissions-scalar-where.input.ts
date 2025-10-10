import { Field, InputType } from '@nestjs/graphql';

import { JsonNullableFilter } from '../prisma/json-nullable-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UuidNullableFilter } from '../prisma/uuid-nullable-filter.input';

@InputType()
export class UserChatPermissionsScalarWhereInput {
  @Field(() => [UserChatPermissionsScalarWhereInput], { nullable: true })
  AND?: Array<UserChatPermissionsScalarWhereInput>;

  @Field(() => [UserChatPermissionsScalarWhereInput], { nullable: true })
  OR?: Array<UserChatPermissionsScalarWhereInput>;

  @Field(() => [UserChatPermissionsScalarWhereInput], { nullable: true })
  NOT?: Array<UserChatPermissionsScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  userId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  chatId?: UuidFilter;

  @Field(() => UuidNullableFilter, { nullable: true })
  roleId?: UuidNullableFilter;

  @Field(() => JsonNullableFilter, { nullable: true })
  permissions?: JsonNullableFilter;
}
