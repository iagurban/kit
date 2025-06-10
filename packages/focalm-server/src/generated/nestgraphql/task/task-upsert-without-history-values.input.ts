import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateWithoutHistoryValuesInput } from './task-create-without-history-values.input';
import { TaskUpdateWithoutHistoryValuesInput } from './task-update-without-history-values.input';
import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskUpsertWithoutHistoryValuesInput {
  @Field(() => TaskUpdateWithoutHistoryValuesInput, { nullable: false })
  @Type(() => TaskUpdateWithoutHistoryValuesInput)
  update!: TaskUpdateWithoutHistoryValuesInput;

  @Field(() => TaskCreateWithoutHistoryValuesInput, { nullable: false })
  @Type(() => TaskCreateWithoutHistoryValuesInput)
  create!: TaskCreateWithoutHistoryValuesInput;

  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;
}
