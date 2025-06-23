import { Field, InputType } from '@nestjs/graphql';

import { ProjectCreateNestedOneWithoutRelationTypesInput } from '../project/project-create-nested-one-without-relation-types.input';

@InputType()
export class TaskToTaskRelationTypeCreateWithoutRelationsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  forward!: string;

  @Field(() => String, { nullable: false })
  inverse!: string;

  @Field(() => ProjectCreateNestedOneWithoutRelationTypesInput, { nullable: false })
  project!: ProjectCreateNestedOneWithoutRelationTypesInput;
}
