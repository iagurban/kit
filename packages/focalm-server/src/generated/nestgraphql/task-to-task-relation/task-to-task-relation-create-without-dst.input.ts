import { Field, InputType } from '@nestjs/graphql';

import { TaskCreateNestedOneWithoutRelationsSrcInput } from '../task/task-create-nested-one-without-relations-src.input';
import { TaskToTaskRelationTypeCreateNestedOneWithoutRelationsInput } from '../task-to-task-relation-type/task-to-task-relation-type-create-nested-one-without-relations.input';

@InputType()
export class TaskToTaskRelationCreateWithoutDstInput {
  @Field(() => TaskCreateNestedOneWithoutRelationsSrcInput, { nullable: false })
  src!: TaskCreateNestedOneWithoutRelationsSrcInput;

  @Field(() => TaskToTaskRelationTypeCreateNestedOneWithoutRelationsInput, { nullable: false })
  type!: TaskToTaskRelationTypeCreateNestedOneWithoutRelationsInput;
}
