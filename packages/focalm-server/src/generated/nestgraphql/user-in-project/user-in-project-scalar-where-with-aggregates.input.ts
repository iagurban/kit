import { Field, InputType } from '@nestjs/graphql';

import { EnumPermissionInProjectWithAggregatesFilter } from '../prisma/enum-permission-in-project-with-aggregates-filter.input';
import { EnumPermissionKindWithAggregatesFilter } from '../prisma/enum-permission-kind-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';

@InputType()
export class UserInProjectScalarWhereWithAggregatesInput {
  @Field(() => [UserInProjectScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<UserInProjectScalarWhereWithAggregatesInput>;

  @Field(() => [UserInProjectScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<UserInProjectScalarWhereWithAggregatesInput>;

  @Field(() => [UserInProjectScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<UserInProjectScalarWhereWithAggregatesInput>;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  userId?: UuidWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  projectId?: UuidWithAggregatesFilter;

  @Field(() => EnumPermissionInProjectWithAggregatesFilter, { nullable: true })
  permission?: EnumPermissionInProjectWithAggregatesFilter;

  @Field(() => EnumPermissionKindWithAggregatesFilter, { nullable: true })
  kind?: EnumPermissionKindWithAggregatesFilter;
}
