import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationScalarWhereInput } from './task-to-task-relation-scalar-where.input';
import { TaskToTaskRelationUncheckedUpdateManyWithoutSrcInput } from './task-to-task-relation-unchecked-update-many-without-src.input';

@InputType()
export class TaskToTaskRelationUpdateManyWithWhereWithoutSrcInput {
  @Field(() => TaskToTaskRelationScalarWhereInput, { nullable: false })
  @Type(() => TaskToTaskRelationScalarWhereInput)
  where!: TaskToTaskRelationScalarWhereInput;

  @Field(() => TaskToTaskRelationUncheckedUpdateManyWithoutSrcInput, { nullable: false })
  @Type(() => TaskToTaskRelationUncheckedUpdateManyWithoutSrcInput)
  data!: TaskToTaskRelationUncheckedUpdateManyWithoutSrcInput;
}
