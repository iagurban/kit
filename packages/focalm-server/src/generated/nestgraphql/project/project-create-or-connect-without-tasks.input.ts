import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ProjectCreateWithoutTasksInput } from './project-create-without-tasks.input';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@InputType()
export class ProjectCreateOrConnectWithoutTasksInput {
  @Field(() => ProjectWhereUniqueInput, { nullable: false })
  @Type(() => ProjectWhereUniqueInput)
  where!: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;

  @Field(() => ProjectCreateWithoutTasksInput, { nullable: false })
  @Type(() => ProjectCreateWithoutTasksInput)
  create!: ProjectCreateWithoutTasksInput;
}
