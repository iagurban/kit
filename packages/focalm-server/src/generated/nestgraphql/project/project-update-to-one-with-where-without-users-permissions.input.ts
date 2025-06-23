import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProjectUpdateWithoutUsersPermissionsInput } from './project-update-without-users-permissions.input';
import { ProjectWhereInput } from './project-where.input';

@InputType()
export class ProjectUpdateToOneWithWhereWithoutUsersPermissionsInput {
  @Field(() => ProjectWhereInput, { nullable: true })
  @Type(() => ProjectWhereInput)
  where?: ProjectWhereInput;

  @Field(() => ProjectUpdateWithoutUsersPermissionsInput, { nullable: false })
  @Type(() => ProjectUpdateWithoutUsersPermissionsInput)
  data!: ProjectUpdateWithoutUsersPermissionsInput;
}
