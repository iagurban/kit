import { Field, ObjectType } from '@nestjs/graphql';

import { PermissionInProject } from '../prisma/permission-in-project.enum';
import { PermissionKind } from '../prisma/permission-kind.enum';

@ObjectType()
export class UserInProjectMaxAggregate {
  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  projectId?: string;

  @Field(() => PermissionInProject, { nullable: true })
  permission?: `${PermissionInProject}`;

  @Field(() => PermissionKind, { nullable: true })
  kind?: `${PermissionKind}`;
}
