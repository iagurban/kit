import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProjectCreateWithoutOwnOfInput } from './project-create-without-own-of.input';
import { ProjectUpdateWithoutOwnOfInput } from './project-update-without-own-of.input';
import { ProjectWhereInput } from './project-where.input';

@InputType()
export class ProjectUpsertWithoutOwnOfInput {
  @Field(() => ProjectUpdateWithoutOwnOfInput, { nullable: false })
  @Type(() => ProjectUpdateWithoutOwnOfInput)
  update!: ProjectUpdateWithoutOwnOfInput;

  @Field(() => ProjectCreateWithoutOwnOfInput, { nullable: false })
  @Type(() => ProjectCreateWithoutOwnOfInput)
  create!: ProjectCreateWithoutOwnOfInput;

  @Field(() => ProjectWhereInput, { nullable: true })
  @Type(() => ProjectWhereInput)
  where?: ProjectWhereInput;
}
