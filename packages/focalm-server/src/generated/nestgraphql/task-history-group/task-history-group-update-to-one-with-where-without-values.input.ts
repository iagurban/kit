import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryGroupUpdateWithoutValuesInput } from './task-history-group-update-without-values.input';
import { TaskHistoryGroupWhereInput } from './task-history-group-where.input';

@InputType()
export class TaskHistoryGroupUpdateToOneWithWhereWithoutValuesInput {
  @Field(() => TaskHistoryGroupWhereInput, { nullable: true })
  @Type(() => TaskHistoryGroupWhereInput)
  where?: TaskHistoryGroupWhereInput;

  @Field(() => TaskHistoryGroupUpdateWithoutValuesInput, { nullable: false })
  @Type(() => TaskHistoryGroupUpdateWithoutValuesInput)
  data!: TaskHistoryGroupUpdateWithoutValuesInput;
}
