import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProjectUpdateWithoutRelationTypesInput } from './project-update-without-relation-types.input';
import { ProjectWhereInput } from './project-where.input';

@InputType()
export class ProjectUpdateToOneWithWhereWithoutRelationTypesInput {
  @Field(() => ProjectWhereInput, { nullable: true })
  @Type(() => ProjectWhereInput)
  where?: ProjectWhereInput;

  @Field(() => ProjectUpdateWithoutRelationTypesInput, { nullable: false })
  @Type(() => ProjectUpdateWithoutRelationTypesInput)
  data!: ProjectUpdateWithoutRelationTypesInput;
}
