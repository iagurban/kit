import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryGroupCreateWithoutValuesInput } from './task-history-group-create-without-values.input';
import { TaskHistoryGroupUpdateWithoutValuesInput } from './task-history-group-update-without-values.input';
import { TaskHistoryGroupWhereInput } from './task-history-group-where.input';

@InputType()
export class TaskHistoryGroupUpsertWithoutValuesInput {
  @Field(() => TaskHistoryGroupUpdateWithoutValuesInput, { nullable: false })
  @Type(() => TaskHistoryGroupUpdateWithoutValuesInput)
  update!: TaskHistoryGroupUpdateWithoutValuesInput;

  @Field(() => TaskHistoryGroupCreateWithoutValuesInput, { nullable: false })
  @Type(() => TaskHistoryGroupCreateWithoutValuesInput)
  create!: TaskHistoryGroupCreateWithoutValuesInput;

  @Field(() => TaskHistoryGroupWhereInput, { nullable: true })
  @Type(() => TaskHistoryGroupWhereInput)
  where?: TaskHistoryGroupWhereInput;
}
