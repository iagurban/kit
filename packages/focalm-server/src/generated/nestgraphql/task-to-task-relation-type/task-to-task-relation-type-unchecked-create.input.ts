import { Field, InputType } from '@nestjs/graphql';

import { TaskToTaskRelationUncheckedCreateNestedManyWithoutTypeInput } from '../task-to-task-relation/task-to-task-relation-unchecked-create-nested-many-without-type.input';

@InputType()
export class TaskToTaskRelationTypeUncheckedCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  forward!: string;

  @Field(() => String, { nullable: false })
  inverse!: string;

  @Field(() => String, { nullable: false })
  projectId!: string;

  @Field(() => TaskToTaskRelationUncheckedCreateNestedManyWithoutTypeInput, { nullable: true })
  relations?: TaskToTaskRelationUncheckedCreateNestedManyWithoutTypeInput;
}
