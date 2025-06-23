import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProjectCreateWithoutTasksInput } from './project-create-without-tasks.input';
import { ProjectUpdateWithoutTasksInput } from './project-update-without-tasks.input';
import { ProjectWhereInput } from './project-where.input';

@InputType()
export class ProjectUpsertWithoutTasksInput {
  @Field(() => ProjectUpdateWithoutTasksInput, { nullable: false })
  @Type(() => ProjectUpdateWithoutTasksInput)
  update!: ProjectUpdateWithoutTasksInput;

  @Field(() => ProjectCreateWithoutTasksInput, { nullable: false })
  @Type(() => ProjectCreateWithoutTasksInput)
  create!: ProjectCreateWithoutTasksInput;

  @Field(() => ProjectWhereInput, { nullable: true })
  @Type(() => ProjectWhereInput)
  where?: ProjectWhereInput;
}
