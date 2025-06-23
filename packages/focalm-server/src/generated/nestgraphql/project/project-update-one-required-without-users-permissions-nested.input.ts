import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ProjectCreateOrConnectWithoutUsersPermissionsInput } from './project-create-or-connect-without-users-permissions.input';
import { ProjectCreateWithoutUsersPermissionsInput } from './project-create-without-users-permissions.input';
import { ProjectUpdateToOneWithWhereWithoutUsersPermissionsInput } from './project-update-to-one-with-where-without-users-permissions.input';
import { ProjectUpsertWithoutUsersPermissionsInput } from './project-upsert-without-users-permissions.input';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@InputType()
export class ProjectUpdateOneRequiredWithoutUsersPermissionsNestedInput {
  @Field(() => ProjectCreateWithoutUsersPermissionsInput, { nullable: true })
  @Type(() => ProjectCreateWithoutUsersPermissionsInput)
  create?: ProjectCreateWithoutUsersPermissionsInput;

  @Field(() => ProjectCreateOrConnectWithoutUsersPermissionsInput, { nullable: true })
  @Type(() => ProjectCreateOrConnectWithoutUsersPermissionsInput)
  connectOrCreate?: ProjectCreateOrConnectWithoutUsersPermissionsInput;

  @Field(() => ProjectUpsertWithoutUsersPermissionsInput, { nullable: true })
  @Type(() => ProjectUpsertWithoutUsersPermissionsInput)
  upsert?: ProjectUpsertWithoutUsersPermissionsInput;

  @Field(() => ProjectWhereUniqueInput, { nullable: true })
  @Type(() => ProjectWhereUniqueInput)
  connect?: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;

  @Field(() => ProjectUpdateToOneWithWhereWithoutUsersPermissionsInput, { nullable: true })
  @Type(() => ProjectUpdateToOneWithWhereWithoutUsersPermissionsInput)
  update?: ProjectUpdateToOneWithWhereWithoutUsersPermissionsInput;
}
