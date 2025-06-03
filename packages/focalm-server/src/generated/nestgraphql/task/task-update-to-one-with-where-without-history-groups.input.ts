import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskUpdateWithoutHistoryGroupsInput } from './task-update-without-history-groups.input';
import { TaskWhereInput } from './task-where.input';

@InputType()
export class TaskUpdateToOneWithWhereWithoutHistoryGroupsInput {
  @Field(() => TaskWhereInput, { nullable: true })
  @Type(() => TaskWhereInput)
  where?: TaskWhereInput;

  @Field(() => TaskUpdateWithoutHistoryGroupsInput, { nullable: false })
  @Type(() => TaskUpdateWithoutHistoryGroupsInput)
  data!: TaskUpdateWithoutHistoryGroupsInput;
}
