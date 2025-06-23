import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationTypeCreateWithoutProjectInput } from './task-to-task-relation-type-create-without-project.input';
import { TaskToTaskRelationTypeUpdateWithoutProjectInput } from './task-to-task-relation-type-update-without-project.input';
import { TaskToTaskRelationTypeWhereUniqueInput } from './task-to-task-relation-type-where-unique.input';

@InputType()
export class TaskToTaskRelationTypeUpsertWithWhereUniqueWithoutProjectInput {
  @Field(() => TaskToTaskRelationTypeWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationTypeWhereUniqueInput, 'id'>;

  @Field(() => TaskToTaskRelationTypeUpdateWithoutProjectInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeUpdateWithoutProjectInput)
  update!: TaskToTaskRelationTypeUpdateWithoutProjectInput;

  @Field(() => TaskToTaskRelationTypeCreateWithoutProjectInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeCreateWithoutProjectInput)
  create!: TaskToTaskRelationTypeCreateWithoutProjectInput;
}
