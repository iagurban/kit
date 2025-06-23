import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationTypeUpdateWithoutProjectInput } from './task-to-task-relation-type-update-without-project.input';
import { TaskToTaskRelationTypeWhereUniqueInput } from './task-to-task-relation-type-where-unique.input';

@InputType()
export class TaskToTaskRelationTypeUpdateWithWhereUniqueWithoutProjectInput {
  @Field(() => TaskToTaskRelationTypeWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationTypeWhereUniqueInput, 'id'>;

  @Field(() => TaskToTaskRelationTypeUpdateWithoutProjectInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeUpdateWithoutProjectInput)
  data!: TaskToTaskRelationTypeUpdateWithoutProjectInput;
}
