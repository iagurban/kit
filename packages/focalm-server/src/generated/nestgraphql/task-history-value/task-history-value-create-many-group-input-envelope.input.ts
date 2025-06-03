import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryValueCreateManyGroupInput } from './task-history-value-create-many-group.input';

@InputType()
export class TaskHistoryValueCreateManyGroupInputEnvelope {
  @Field(() => [TaskHistoryValueCreateManyGroupInput], { nullable: false })
  @Type(() => TaskHistoryValueCreateManyGroupInput)
  data!: Array<TaskHistoryValueCreateManyGroupInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
