import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ProjectCreateWithoutRelationTypesInput } from './project-create-without-relation-types.input';
import { ProjectUpdateWithoutRelationTypesInput } from './project-update-without-relation-types.input';
import { ProjectWhereInput } from './project-where.input';

@InputType()
export class ProjectUpsertWithoutRelationTypesInput {
  @Field(() => ProjectUpdateWithoutRelationTypesInput, { nullable: false })
  @Type(() => ProjectUpdateWithoutRelationTypesInput)
  update!: ProjectUpdateWithoutRelationTypesInput;

  @Field(() => ProjectCreateWithoutRelationTypesInput, { nullable: false })
  @Type(() => ProjectCreateWithoutRelationTypesInput)
  create!: ProjectCreateWithoutRelationTypesInput;

  @Field(() => ProjectWhereInput, { nullable: true })
  @Type(() => ProjectWhereInput)
  where?: ProjectWhereInput;
}
