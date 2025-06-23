import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@ArgsType()
export class DeleteOneProjectArgs {
  @Field(() => ProjectWhereUniqueInput, { nullable: false })
  @Type(() => ProjectWhereUniqueInput)
  where!: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;
}
