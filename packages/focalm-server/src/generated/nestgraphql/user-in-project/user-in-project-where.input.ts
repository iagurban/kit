import { Field, InputType } from '@nestjs/graphql';

import { EnumPermissionInProjectFilter } from '../prisma/enum-permission-in-project-filter.input';
import { EnumPermissionKindFilter } from '../prisma/enum-permission-kind-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { ProjectScalarRelationFilter } from '../project/project-scalar-relation-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';

@InputType()
export class UserInProjectWhereInput {
  @Field(() => [UserInProjectWhereInput], { nullable: true })
  AND?: Array<UserInProjectWhereInput>;

  @Field(() => [UserInProjectWhereInput], { nullable: true })
  OR?: Array<UserInProjectWhereInput>;

  @Field(() => [UserInProjectWhereInput], { nullable: true })
  NOT?: Array<UserInProjectWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  userId?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  projectId?: UuidFilter;

  @Field(() => EnumPermissionInProjectFilter, { nullable: true })
  permission?: EnumPermissionInProjectFilter;

  @Field(() => EnumPermissionKindFilter, { nullable: true })
  kind?: EnumPermissionKindFilter;

  @Field(() => UserScalarRelationFilter, { nullable: true })
  user?: UserScalarRelationFilter;

  @Field(() => ProjectScalarRelationFilter, { nullable: true })
  project?: ProjectScalarRelationFilter;
}
