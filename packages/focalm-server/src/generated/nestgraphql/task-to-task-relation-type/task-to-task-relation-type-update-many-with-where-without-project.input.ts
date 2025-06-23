import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationTypeScalarWhereInput } from './task-to-task-relation-type-scalar-where.input';
import { TaskToTaskRelationTypeUpdateManyMutationInput } from './task-to-task-relation-type-update-many-mutation.input';

@InputType()
export class TaskToTaskRelationTypeUpdateManyWithWhereWithoutProjectInput {
  @Field(() => TaskToTaskRelationTypeScalarWhereInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeScalarWhereInput)
  where!: TaskToTaskRelationTypeScalarWhereInput;

  @Field(() => TaskToTaskRelationTypeUpdateManyMutationInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeUpdateManyMutationInput)
  data!: TaskToTaskRelationTypeUpdateManyMutationInput;
}
