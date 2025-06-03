import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateWithoutParentInput } from './task-create-without-parent.input';
import { TaskUpdateWithoutParentInput } from './task-update-without-parent.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpsertWithWhereUniqueWithoutParentInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskUpdateWithoutParentInput, { nullable: false })
  @Type(() => TaskUpdateWithoutParentInput)
  update!: TaskUpdateWithoutParentInput;

  @Field(() => TaskCreateWithoutParentInput, { nullable: false })
  @Type(() => TaskCreateWithoutParentInput)
  create!: TaskCreateWithoutParentInput;
}
