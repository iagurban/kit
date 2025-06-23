import { Field, ObjectType } from '@nestjs/graphql';

import { PermissionInProject } from '../prisma/permission-in-project.enum';
import { PermissionKind } from '../prisma/permission-kind.enum';
import { UserInProjectCountAggregate } from './user-in-project-count-aggregate.output';
import { UserInProjectMaxAggregate } from './user-in-project-max-aggregate.output';
import { UserInProjectMinAggregate } from './user-in-project-min-aggregate.output';

@ObjectType()
export class UserInProjectGroupBy {
  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => String, { nullable: false })
  projectId!: string;

  @Field(() => PermissionInProject, { nullable: false })
  permission!: `${PermissionInProject}`;

  @Field(() => PermissionKind, { nullable: false })
  kind!: `${PermissionKind}`;

  @Field(() => UserInProjectCountAggregate, { nullable: true })
  _count?: UserInProjectCountAggregate;

  @Field(() => UserInProjectMinAggregate, { nullable: true })
  _min?: UserInProjectMinAggregate;

  @Field(() => UserInProjectMaxAggregate, { nullable: true })
  _max?: UserInProjectMaxAggregate;
}
