import { Field, InputType } from '@nestjs/graphql';

import { TaskCreateNestedOneWithoutRelationsDstInput } from '../task/task-create-nested-one-without-relations-dst.input';
import { TaskToTaskRelationTypeCreateNestedOneWithoutRelationsInput } from '../task-to-task-relation-type/task-to-task-relation-type-create-nested-one-without-relations.input';

@InputType()
export class TaskToTaskRelationCreateWithoutSrcInput {
  @Field(() => TaskCreateNestedOneWithoutRelationsDstInput, { nullable: false })
  dst!: TaskCreateNestedOneWithoutRelationsDstInput;

  @Field(() => TaskToTaskRelationTypeCreateNestedOneWithoutRelationsInput, { nullable: false })
  type!: TaskToTaskRelationTypeCreateNestedOneWithoutRelationsInput;
}
