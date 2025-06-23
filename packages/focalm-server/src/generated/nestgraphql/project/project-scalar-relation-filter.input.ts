import { Field, InputType } from '@nestjs/graphql';

import { ProjectWhereInput } from './project-where.input';

@InputType()
export class ProjectScalarRelationFilter {
  @Field(() => ProjectWhereInput, { nullable: true })
  is?: ProjectWhereInput;

  @Field(() => ProjectWhereInput, { nullable: true })
  isNot?: ProjectWhereInput;
}
