import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ProjectCreateOrConnectWithoutOwnOfInput } from './project-create-or-connect-without-own-of.input';
import { ProjectCreateWithoutOwnOfInput } from './project-create-without-own-of.input';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@InputType()
export class ProjectCreateNestedOneWithoutOwnOfInput {
  @Field(() => ProjectCreateWithoutOwnOfInput, { nullable: true })
  @Type(() => ProjectCreateWithoutOwnOfInput)
  create?: ProjectCreateWithoutOwnOfInput;

  @Field(() => ProjectCreateOrConnectWithoutOwnOfInput, { nullable: true })
  @Type(() => ProjectCreateOrConnectWithoutOwnOfInput)
  connectOrCreate?: ProjectCreateOrConnectWithoutOwnOfInput;

  @Field(() => ProjectWhereUniqueInput, { nullable: true })
  @Type(() => ProjectWhereUniqueInput)
  connect?: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;
}
