import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ProjectUpdateInput } from './project-update.input';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@ArgsType()
export class UpdateOneProjectArgs {
  @Field(() => ProjectUpdateInput, { nullable: false })
  @Type(() => ProjectUpdateInput)
  data!: ProjectUpdateInput;

  @Field(() => ProjectWhereUniqueInput, { nullable: false })
  @Type(() => ProjectWhereUniqueInput)
  where!: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;
}
