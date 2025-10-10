import { Field, InputType } from '@nestjs/graphql';

import { JsonNullableWithAggregatesFilter } from '../prisma/json-nullable-with-aggregates-filter.input';
import { UuidNullableWithAggregatesFilter } from '../prisma/uuid-nullable-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class UserChatPermissionsScalarWhereWithAggregatesInput {
  @Field(() => [UserChatPermissionsScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<UserChatPermissionsScalarWhereWithAggregatesInput>;

  @Field(() => [UserChatPermissionsScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<UserChatPermissionsScalarWhereWithAggregatesInput>;

  @Field(() => [UserChatPermissionsScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<UserChatPermissionsScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  userId?: UuidWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  chatId?: UuidWithAggregatesFilter;

  @Field(() => UuidNullableWithAggregatesFilter, { nullable: true })
  roleId?: UuidNullableWithAggregatesFilter;

  @Field(() => JsonNullableWithAggregatesFilter, { nullable: true })
  permissions?: JsonNullableWithAggregatesFilter;
}
