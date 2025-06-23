import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ProjectCreateWithoutOwnOfInput } from './project-create-without-own-of.input';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@InputType()
export class ProjectCreateOrConnectWithoutOwnOfInput {
  @Field(() => ProjectWhereUniqueInput, { nullable: false })
  @Type(() => ProjectWhereUniqueInput)
  where!: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;

  @Field(() => ProjectCreateWithoutOwnOfInput, { nullable: false })
  @Type(() => ProjectCreateWithoutOwnOfInput)
  create!: ProjectCreateWithoutOwnOfInput;
}
