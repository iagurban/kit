import { Field, InputType } from '@nestjs/graphql';

import { PermissionInProject } from '../prisma/permission-in-project.enum';
import { PermissionKind } from '../prisma/permission-kind.enum';
import { UserCreateNestedOneWithoutInProjectsInput } from '../user/user-create-nested-one-without-in-projects.input';

@InputType()
export class UserInProjectCreateWithoutProjectInput {
  @Field(() => PermissionInProject, { nullable: false })
  permission!: `${PermissionInProject}`;

  @Field(() => PermissionKind, { nullable: false })
  kind!: `${PermissionKind}`;

  @Field(() => UserCreateNestedOneWithoutInProjectsInput, { nullable: false })
  user!: UserCreateNestedOneWithoutInProjectsInput;
}
