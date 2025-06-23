import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ProjectCreateOrConnectWithoutTasksInput } from './project-create-or-connect-without-tasks.input';
import { ProjectCreateWithoutTasksInput } from './project-create-without-tasks.input';
import { ProjectUpdateToOneWithWhereWithoutTasksInput } from './project-update-to-one-with-where-without-tasks.input';
import { ProjectUpsertWithoutTasksInput } from './project-upsert-without-tasks.input';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@InputType()
export class ProjectUpdateOneRequiredWithoutTasksNestedInput {
  @Field(() => ProjectCreateWithoutTasksInput, { nullable: true })
  @Type(() => ProjectCreateWithoutTasksInput)
  create?: ProjectCreateWithoutTasksInput;

  @Field(() => ProjectCreateOrConnectWithoutTasksInput, { nullable: true })
  @Type(() => ProjectCreateOrConnectWithoutTasksInput)
  connectOrCreate?: ProjectCreateOrConnectWithoutTasksInput;

  @Field(() => ProjectUpsertWithoutTasksInput, { nullable: true })
  @Type(() => ProjectUpsertWithoutTasksInput)
  upsert?: ProjectUpsertWithoutTasksInput;

  @Field(() => ProjectWhereUniqueInput, { nullable: true })
  @Type(() => ProjectWhereUniqueInput)
  connect?: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;

  @Field(() => ProjectUpdateToOneWithWhereWithoutTasksInput, { nullable: true })
  @Type(() => ProjectUpdateToOneWithWhereWithoutTasksInput)
  update?: ProjectUpdateToOneWithWhereWithoutTasksInput;
}
