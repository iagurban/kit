import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueCreateWithoutTaskInput } from './task-history-value-create-without-task.input';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@InputType()
export class TaskHistoryValueCreateOrConnectWithoutTaskInput {
  @Field(() => TaskHistoryValueWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'groupId_key'>;

  @Field(() => TaskHistoryValueCreateWithoutTaskInput, { nullable: false })
  @Type(() => TaskHistoryValueCreateWithoutTaskInput)
  create!: TaskHistoryValueCreateWithoutTaskInput;
}
