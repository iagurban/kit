import { Field, InputType } from '@nestjs/graphql';

import { PermissionInProject } from '../prisma/permission-in-project.enum';
import { PermissionKind } from '../prisma/permission-kind.enum';
import { ProjectCreateNestedOneWithoutUsersPermissionsInput } from '../project/project-create-nested-one-without-users-permissions.input';

@InputType()
export class UserInProjectCreateWithoutUserInput {
  @Field(() => PermissionInProject, { nullable: false })
  permission!: `${PermissionInProject}`;

  @Field(() => PermissionKind, { nullable: false })
  kind!: `${PermissionKind}`;

  @Field(() => ProjectCreateNestedOneWithoutUsersPermissionsInput, { nullable: false })
  project!: ProjectCreateNestedOneWithoutUsersPermissionsInput;
}
