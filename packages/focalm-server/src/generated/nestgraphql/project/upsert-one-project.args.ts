import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ProjectCreateInput } from './project-create.input';
import { ProjectUpdateInput } from './project-update.input';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@ArgsType()
export class UpsertOneProjectArgs {
  @Field(() => ProjectWhereUniqueInput, { nullable: false })
  @Type(() => ProjectWhereUniqueInput)
  where!: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;

  @Field(() => ProjectCreateInput, { nullable: false })
  @Type(() => ProjectCreateInput)
  create!: ProjectCreateInput;

  @Field(() => ProjectUpdateInput, { nullable: false })
  @Type(() => ProjectUpdateInput)
  update!: ProjectUpdateInput;
}
