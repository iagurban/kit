import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskUpdateWithoutHistoryValuesInput } from './task-update-without-history-values.input';
import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskUpdateToOneWithWhereWithoutHistoryValuesInput {
  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;

  @Field(() => TaskUpdateWithoutHistoryValuesInput, { nullable: false })
  @Type(() => TaskUpdateWithoutHistoryValuesInput)
  data!: TaskUpdateWithoutHistoryValuesInput;
}
