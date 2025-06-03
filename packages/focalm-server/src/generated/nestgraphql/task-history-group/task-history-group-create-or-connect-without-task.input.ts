import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupCreateWithoutTaskInput } from './task-history-group-create-without-task.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@InputType()
export class TaskHistoryGroupCreateOrConnectWithoutTaskInput {
  @Field(() => TaskHistoryGroupWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>;

  @Field(() => TaskHistoryGroupCreateWithoutTaskInput, { nullable: false })
  @Type(() => TaskHistoryGroupCreateWithoutTaskInput)
  create!: TaskHistoryGroupCreateWithoutTaskInput;
}
