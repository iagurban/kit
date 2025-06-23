import { Field, InputType } from '@nestjs/graphql';

import { TaskCreateNestedOneWithoutRelationsDstInput } from '../task/task-create-nested-one-without-relations-dst.input';
import { TaskCreateNestedOneWithoutRelationsSrcInput } from '../task/task-create-nested-one-without-relations-src.input';
import { TaskToTaskRelationTypeCreateNestedOneWithoutRelationsInput } from '../task-to-task-relation-type/task-to-task-relation-type-create-nested-one-without-relations.input';

@InputType()
export class TaskToTaskRelationCreateInput {
  @Field(() => TaskCreateNestedOneWithoutRelationsSrcInput, { nullable: false })
  src!: TaskCreateNestedOneWithoutRelationsSrcInput;

  @Field(() => TaskCreateNestedOneWithoutRelationsDstInput, { nullable: false })
  dst!: TaskCreateNestedOneWithoutRelationsDstInput;

  @Field(() => TaskToTaskRelationTypeCreateNestedOneWithoutRelationsInput, { nullable: false })
  type!: TaskToTaskRelationTypeCreateNestedOneWithoutRelationsInput;
}
