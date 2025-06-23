import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateWithoutProjectInput } from './task-create-without-project.input';
import { TaskUpdateWithoutProjectInput } from './task-update-without-project.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpsertWithWhereUniqueWithoutProjectInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskUpdateWithoutProjectInput, { nullable: false })
  @Type(() => TaskUpdateWithoutProjectInput)
  update!: TaskUpdateWithoutProjectInput;

  @Field(() => TaskCreateWithoutProjectInput, { nullable: false })
  @Type(() => TaskCreateWithoutProjectInput)
  create!: TaskCreateWithoutProjectInput;
}
