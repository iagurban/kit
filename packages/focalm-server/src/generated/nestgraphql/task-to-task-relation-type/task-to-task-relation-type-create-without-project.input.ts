import { Field, InputType } from '@nestjs/graphql';

import { TaskToTaskRelationCreateNestedManyWithoutTypeInput } from '../task-to-task-relation/task-to-task-relation-create-nested-many-without-type.input';

@InputType()
export class TaskToTaskRelationTypeCreateWithoutProjectInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  forward!: string;

  @Field(() => String, { nullable: false })
  inverse!: string;

  @Field(() => TaskToTaskRelationCreateNestedManyWithoutTypeInput, { nullable: true })
  relations?: TaskToTaskRelationCreateNestedManyWithoutTypeInput;
}
