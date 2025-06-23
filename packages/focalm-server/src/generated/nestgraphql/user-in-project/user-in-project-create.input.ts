import { Field, InputType } from '@nestjs/graphql';

import { PermissionInProject } from '../prisma/permission-in-project.enum';
import { PermissionKind } from '../prisma/permission-kind.enum';
import { ProjectCreateNestedOneWithoutUsersPermissionsInput } from '../project/project-create-nested-one-without-users-permissions.input';
import { UserCreateNestedOneWithoutInProjectsInput } from '../user/user-create-nested-one-without-in-projects.input';

@InputType()
export class UserInProjectCreateInput {
  @Field(() => PermissionInProject, { nullable: false })
  permission!: `${PermissionInProject}`;

  @Field(() => PermissionKind, { nullable: false })
  kind!: `${PermissionKind}`;

  @Field(() => UserCreateNestedOneWithoutInProjectsInput, { nullable: false })
  user!: UserCreateNestedOneWithoutInProjectsInput;

  @Field(() => ProjectCreateNestedOneWithoutUsersPermissionsInput, { nullable: false })
  project!: ProjectCreateNestedOneWithoutUsersPermissionsInput;
}
