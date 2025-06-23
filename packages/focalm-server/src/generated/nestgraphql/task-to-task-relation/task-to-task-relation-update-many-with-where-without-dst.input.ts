import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationScalarWhereInput } from './task-to-task-relation-scalar-where.input';
import { TaskToTaskRelationUncheckedUpdateManyWithoutDstInput } from './task-to-task-relation-unchecked-update-many-without-dst.input';

@InputType()
export class TaskToTaskRelationUpdateManyWithWhereWithoutDstInput {
  @Field(() => TaskToTaskRelationScalarWhereInput, { nullable: false })
  @Type(() => TaskToTaskRelationScalarWhereInput)
  where!: TaskToTaskRelationScalarWhereInput;

  @Field(() => TaskToTaskRelationUncheckedUpdateManyWithoutDstInput, { nullable: false })
  @Type(() => TaskToTaskRelationUncheckedUpdateManyWithoutDstInput)
  data!: TaskToTaskRelationUncheckedUpdateManyWithoutDstInput;
}
