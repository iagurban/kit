import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationScalarWhereInput } from './task-to-task-relation-scalar-where.input';
import { TaskToTaskRelationUncheckedUpdateManyWithoutTypeInput } from './task-to-task-relation-unchecked-update-many-without-type.input';

@InputType()
export class TaskToTaskRelationUpdateManyWithWhereWithoutTypeInput {
  @Field(() => TaskToTaskRelationScalarWhereInput, { nullable: false })
  @Type(() => TaskToTaskRelationScalarWhereInput)
  where!: TaskToTaskRelationScalarWhereInput;

  @Field(() => TaskToTaskRelationUncheckedUpdateManyWithoutTypeInput, { nullable: false })
  @Type(() => TaskToTaskRelationUncheckedUpdateManyWithoutTypeInput)
  data!: TaskToTaskRelationUncheckedUpdateManyWithoutTypeInput;
}
