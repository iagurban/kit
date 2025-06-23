import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ProjectCreateWithoutUsersPermissionsInput } from './project-create-without-users-permissions.input';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@InputType()
export class ProjectCreateOrConnectWithoutUsersPermissionsInput {
  @Field(() => ProjectWhereUniqueInput, { nullable: false })
  @Type(() => ProjectWhereUniqueInput)
  where!: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;

  @Field(() => ProjectCreateWithoutUsersPermissionsInput, { nullable: false })
  @Type(() => ProjectCreateWithoutUsersPermissionsInput)
  create!: ProjectCreateWithoutUsersPermissionsInput;
}
