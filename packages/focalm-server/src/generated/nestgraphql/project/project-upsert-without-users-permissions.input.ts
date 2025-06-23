import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProjectCreateWithoutUsersPermissionsInput } from './project-create-without-users-permissions.input';
import { ProjectUpdateWithoutUsersPermissionsInput } from './project-update-without-users-permissions.input';
import { ProjectWhereInput } from './project-where.input';

@InputType()
export class ProjectUpsertWithoutUsersPermissionsInput {
  @Field(() => ProjectUpdateWithoutUsersPermissionsInput, { nullable: false })
  @Type(() => ProjectUpdateWithoutUsersPermissionsInput)
  update!: ProjectUpdateWithoutUsersPermissionsInput;

  @Field(() => ProjectCreateWithoutUsersPermissionsInput, { nullable: false })
  @Type(() => ProjectCreateWithoutUsersPermissionsInput)
  create!: ProjectCreateWithoutUsersPermissionsInput;

  @Field(() => ProjectWhereInput, { nullable: true })
  @Type(() => ProjectWhereInput)
  where?: ProjectWhereInput;
}
