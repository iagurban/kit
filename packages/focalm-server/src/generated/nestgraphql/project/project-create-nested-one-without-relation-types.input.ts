import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ProjectCreateOrConnectWithoutRelationTypesInput } from './project-create-or-connect-without-relation-types.input';
import { ProjectCreateWithoutRelationTypesInput } from './project-create-without-relation-types.input';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@InputType()
export class ProjectCreateNestedOneWithoutRelationTypesInput {
  @Field(() => ProjectCreateWithoutRelationTypesInput, { nullable: true })
  @Type(() => ProjectCreateWithoutRelationTypesInput)
  create?: ProjectCreateWithoutRelationTypesInput;

  @Field(() => ProjectCreateOrConnectWithoutRelationTypesInput, { nullable: true })
  @Type(() => ProjectCreateOrConnectWithoutRelationTypesInput)
  connectOrCreate?: ProjectCreateOrConnectWithoutRelationTypesInput;

  @Field(() => ProjectWhereUniqueInput, { nullable: true })
  @Type(() => ProjectWhereUniqueInput)
  connect?: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;
}
