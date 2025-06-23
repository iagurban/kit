import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskToTaskRelationTypeCreateWithoutRelationsInput } from './task-to-task-relation-type-create-without-relations.input';
import { TaskToTaskRelationTypeUpdateWithoutRelationsInput } from './task-to-task-relation-type-update-without-relations.input';
import { TaskToTaskRelationTypeWhereInput } from './task-to-task-relation-type-where.input';

@InputType()
export class TaskToTaskRelationTypeUpsertWithoutRelationsInput {
  @Field(() => TaskToTaskRelationTypeUpdateWithoutRelationsInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeUpdateWithoutRelationsInput)
  update!: TaskToTaskRelationTypeUpdateWithoutRelationsInput;

  @Field(() => TaskToTaskRelationTypeCreateWithoutRelationsInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeCreateWithoutRelationsInput)
  create!: TaskToTaskRelationTypeCreateWithoutRelationsInput;

  @Field(() => TaskToTaskRelationTypeWhereInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeWhereInput)
  where?: TaskToTaskRelationTypeWhereInput;
}
