import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryGroupCreateManyTaskInput } from './task-history-group-create-many-task.input';

@InputType()
export class TaskHistoryGroupCreateManyTaskInputEnvelope {
  @Field(() => [TaskHistoryGroupCreateManyTaskInput], { nullable: false })
  @Type(() => TaskHistoryGroupCreateManyTaskInput)
  data!: Array<TaskHistoryGroupCreateManyTaskInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
