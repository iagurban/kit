import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ProjectCreateOrConnectWithoutTasksInput } from './project-create-or-connect-without-tasks.input';
import { ProjectCreateWithoutTasksInput } from './project-create-without-tasks.input';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@InputType()
export class ProjectCreateNestedOneWithoutTasksInput {
  @Field(() => ProjectCreateWithoutTasksInput, { nullable: true })
  @Type(() => ProjectCreateWithoutTasksInput)
  create?: ProjectCreateWithoutTasksInput;

  @Field(() => ProjectCreateOrConnectWithoutTasksInput, { nullable: true })
  @Type(() => ProjectCreateOrConnectWithoutTasksInput)
  connectOrCreate?: ProjectCreateOrConnectWithoutTasksInput;

  @Field(() => ProjectWhereUniqueInput, { nullable: true })
  @Type(() => ProjectWhereUniqueInput)
  connect?: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;
}
