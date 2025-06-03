import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskCreateWithoutHistoryGroupsInput } from './task-create-without-history-groups.input';
import { TaskUpdateWithoutHistoryGroupsInput } from './task-update-without-history-groups.input';
import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskUpsertWithoutHistoryGroupsInput {
  @Field(() => TaskUpdateWithoutHistoryGroupsInput, { nullable: false })
  @Type(() => TaskUpdateWithoutHistoryGroupsInput)
  update!: TaskUpdateWithoutHistoryGroupsInput;

  @Field(() => TaskCreateWithoutHistoryGroupsInput, { nullable: false })
  @Type(() => TaskCreateWithoutHistoryGroupsInput)
  create!: TaskCreateWithoutHistoryGroupsInput;

  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;
}
