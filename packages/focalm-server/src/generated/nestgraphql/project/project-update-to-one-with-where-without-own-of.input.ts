import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProjectUpdateWithoutOwnOfInput } from './project-update-without-own-of.input';
import { ProjectWhereInput } from './project-where.input';

@InputType()
export class ProjectUpdateToOneWithWhereWithoutOwnOfInput {
  @Field(() => ProjectWhereInput, { nullable: true })
  @Type(() => ProjectWhereInput)
  where?: ProjectWhereInput;

  @Field(() => ProjectUpdateWithoutOwnOfInput, { nullable: false })
  @Type(() => ProjectUpdateWithoutOwnOfInput)
  data!: ProjectUpdateWithoutOwnOfInput;
}
