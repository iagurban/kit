import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateWithoutHistoryValuesInput } from './task-create-without-history-values.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskCreateOrConnectWithoutHistoryValuesInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskCreateWithoutHistoryValuesInput, { nullable: false })
  @Type(() => TaskCreateWithoutHistoryValuesInput)
  create!: TaskCreateWithoutHistoryValuesInput;
}
