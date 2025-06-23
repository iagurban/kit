import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ProjectCreateWithoutRelationTypesInput } from './project-create-without-relation-types.input';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@InputType()
export class ProjectCreateOrConnectWithoutRelationTypesInput {
  @Field(() => ProjectWhereUniqueInput, { nullable: false })
  @Type(() => ProjectWhereUniqueInput)
  where!: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;

  @Field(() => ProjectCreateWithoutRelationTypesInput, { nullable: false })
  @Type(() => ProjectCreateWithoutRelationTypesInput)
  create!: ProjectCreateWithoutRelationTypesInput;
}
