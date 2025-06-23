import { Field, InputType } from '@nestjs/graphql';

import { ProjectCreateNestedOneWithoutRelationTypesInput } from '../project/project-create-nested-one-without-relation-types.input';
import { TaskToTaskRelationCreateNestedManyWithoutTypeInput } from '../task-to-task-relation/task-to-task-relation-create-nested-many-without-type.input';

@InputType()
export class TaskToTaskRelationTypeCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  forward!: string;

  @Field(() => String, { nullable: false })
  inverse!: string;

  @Field(() => TaskToTaskRelationCreateNestedManyWithoutTypeInput, { nullable: true })
  relations?: TaskToTaskRelationCreateNestedManyWithoutTypeInput;

  @Field(() => ProjectCreateNestedOneWithoutRelationTypesInput, { nullable: false })
  project!: ProjectCreateNestedOneWithoutRelationTypesInput;
}
