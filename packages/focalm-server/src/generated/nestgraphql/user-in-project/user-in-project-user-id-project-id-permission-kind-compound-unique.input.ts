import { Field, InputType } from '@nestjs/graphql';

import { PermissionInProject } from '../prisma/permission-in-project.enum';
import { PermissionKind } from '../prisma/permission-kind.enum';

@InputType()
export class UserInProjectUserIdProjectIdPermissionKindCompoundUniqueInput {
  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  projectId!: string;

  @Field(() => PermissionInProject, { nullable: false })
  permission!: `${PermissionInProject}`;

  @Field(() => PermissionKind, { nullable: false })
  kind!: `${PermissionKind}`;
}
