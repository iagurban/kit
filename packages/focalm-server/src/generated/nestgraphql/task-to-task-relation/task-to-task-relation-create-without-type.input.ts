import { Field, InputType } from '@nestjs/graphql';

import { TaskCreateNestedOneWithoutRelationsDstInput } from '../task/task-create-nested-one-without-relations-dst.input';
import { TaskCreateNestedOneWithoutRelationsSrcInput } from '../task/task-create-nested-one-without-relations-src.input';

@InputType()
export class TaskToTaskRelationCreateWithoutTypeInput {
  @Field(() => TaskCreateNestedOneWithoutRelationsSrcInput, { nullable: false })
  src!: TaskCreateNestedOneWithoutRelationsSrcInput;

  @Field(() => TaskCreateNestedOneWithoutRelationsDstInput, { nullable: false })
  dst!: TaskCreateNestedOneWithoutRelationsDstInput;
}
