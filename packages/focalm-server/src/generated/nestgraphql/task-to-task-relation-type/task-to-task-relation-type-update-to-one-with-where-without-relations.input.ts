import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationTypeUpdateWithoutRelationsInput } from './task-to-task-relation-type-update-without-relations.input';
import { TaskToTaskRelationTypeWhereInput } from './task-to-task-relation-type-where.input';

@InputType()
export class TaskToTaskRelationTypeUpdateToOneWithWhereWithoutRelationsInput {
  @Field(() => TaskToTaskRelationTypeWhereInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeWhereInput)
  where?: TaskToTaskRelationTypeWhereInput;

  @Field(() => TaskToTaskRelationTypeUpdateWithoutRelationsInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeUpdateWithoutRelationsInput)
  data!: TaskToTaskRelationTypeUpdateWithoutRelationsInput;
}
