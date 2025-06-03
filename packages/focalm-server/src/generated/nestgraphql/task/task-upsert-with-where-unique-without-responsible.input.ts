import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateWithoutResponsibleInput } from './task-create-without-responsible.input';
import { TaskUpdateWithoutResponsibleInput } from './task-update-without-responsible.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpsertWithWhereUniqueWithoutResponsibleInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskUpdateWithoutResponsibleInput, { nullable: false })
  @Type(() => TaskUpdateWithoutResponsibleInput)
  update!: TaskUpdateWithoutResponsibleInput;

  @Field(() => TaskCreateWithoutResponsibleInput, { nullable: false })
  @Type(() => TaskCreateWithoutResponsibleInput)
  create!: TaskCreateWithoutResponsibleInput;
}
