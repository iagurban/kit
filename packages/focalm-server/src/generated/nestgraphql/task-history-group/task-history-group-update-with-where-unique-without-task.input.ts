import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupUpdateWithoutTaskInput } from './task-history-group-update-without-task.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@InputType()
export class TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInput {
  @Field(() => TaskHistoryGroupWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>;

  @Field(() => TaskHistoryGroupUpdateWithoutTaskInput, { nullable: false })
  @Type(() => TaskHistoryGroupUpdateWithoutTaskInput)
  data!: TaskHistoryGroupUpdateWithoutTaskInput;
}
