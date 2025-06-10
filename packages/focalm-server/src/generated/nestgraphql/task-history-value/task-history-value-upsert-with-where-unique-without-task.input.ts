import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueCreateWithoutTaskInput } from './task-history-value-create-without-task.input';
import { TaskHistoryValueUpdateWithoutTaskInput } from './task-history-value-update-without-task.input';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@InputType()
export class TaskHistoryValueUpsertWithWhereUniqueWithoutTaskInput {
  @Field(() => TaskHistoryValueWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'groupId_key'>;

  @Field(() => TaskHistoryValueUpdateWithoutTaskInput, { nullable: false })
  @Type(() => TaskHistoryValueUpdateWithoutTaskInput)
  update!: TaskHistoryValueUpdateWithoutTaskInput;

  @Field(() => TaskHistoryValueCreateWithoutTaskInput, { nullable: false })
  @Type(() => TaskHistoryValueCreateWithoutTaskInput)
  create!: TaskHistoryValueCreateWithoutTaskInput;
}
