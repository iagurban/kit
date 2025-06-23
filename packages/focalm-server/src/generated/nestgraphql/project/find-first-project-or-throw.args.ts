import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ProjectOrderByWithRelationInput } from './project-order-by-with-relation.input';
import { ProjectScalarFieldEnum } from './project-scalar-field.enum';
import { ProjectWhereInput } from './project-where.input';
import { ProjectWhereUniqueInput } from './project-where-unique.input';

@ArgsType()
export class FindFirstProjectOrThrowArgs {
  @Field(() => ProjectWhereInput, { nullable: true })
  @Type(() => ProjectWhereInput)
  where?: ProjectWhereInput;

  @Field(() => [ProjectOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<ProjectOrderByWithRelationInput>;

  @Field(() => ProjectWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<ProjectWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [ProjectScalarFieldEnum], { nullable: true })
  distinct?: Array<`${ProjectScalarFieldEnum}`>;
}
