import { Field, ObjectType } from '@nestjs/graphql';

import { PermissionInProject } from '../prisma/permission-in-project.enum';
import { PermissionKind } from '../prisma/permission-kind.enum';
import { Project } from '../project/project.model';
import { User } from '../user/user.model';

@ObjectType()
export class UserInProject {
  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  projectId!: string;

  @Field(() => PermissionInProject, { nullable: false })
  permission!: `${PermissionInProject}`;

  @Field(() => PermissionKind, { nullable: false })
  kind!: `${PermissionKind}`;

  @Field(() => User, { nullable: false })
  user?: User;

  @Field(() => Project, { nullable: false })
  project?: Project;
}
