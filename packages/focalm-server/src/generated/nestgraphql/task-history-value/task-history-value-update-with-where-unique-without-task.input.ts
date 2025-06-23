import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueUpdateWithoutTaskInput } from './task-history-value-update-without-task.input';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@InputType()
export class TaskHistoryValueUpdateWithWhereUniqueWithoutTaskInput {
  @Field(() => TaskHistoryValueWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'id'>;

  @Field(() => TaskHistoryValueUpdateWithoutTaskInput, { nullable: false })
  @Type(() => TaskHistoryValueUpdateWithoutTaskInput)
  data!: TaskHistoryValueUpdateWithoutTaskInput;
}
