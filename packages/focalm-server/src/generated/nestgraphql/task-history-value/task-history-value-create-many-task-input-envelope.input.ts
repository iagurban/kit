import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryValueCreateManyTaskInput } from './task-history-value-create-many-task.input';

@InputType()
export class TaskHistoryValueCreateManyTaskInputEnvelope {
  @Field(() => [TaskHistoryValueCreateManyTaskInput], { nullable: false })
  @Type(() => TaskHistoryValueCreateManyTaskInput)
  data!: Array<TaskHistoryValueCreateManyTaskInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
