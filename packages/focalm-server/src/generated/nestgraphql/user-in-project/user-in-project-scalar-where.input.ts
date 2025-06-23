import { Field, InputType } from '@nestjs/graphql';

import { EnumPermissionInProjectFilter } from '../prisma/enum-permission-in-project-filter.input';
import { EnumPermissionKindFilter } from '../prisma/enum-permission-kind-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class UserInProjectScalarWhereInput {
  @Field(() => [UserInProjectScalarWhereInput], { nullable: true })
  AND?: Array<UserInProjectScalarWhereInput>;

  @Field(() => [UserInProjectScalarWhereInput], { nullable: true })
  OR?: Array<UserInProjectScalarWhereInput>;

  @Field(() => [UserInProjectScalarWhereInput], { nullable: true })
  NOT?: Array<UserInProjectScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  userId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  projectId?: UuidFilter;

  @Field(() => EnumPermissionInProjectFilter, { nullable: true })
  permission?: EnumPermissionInProjectFilter;

  @Field(() => EnumPermissionKindFilter, { nullable: true })
  kind?: EnumPermissionKindFilter;
}
