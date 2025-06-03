import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateWithoutHistoryGroupsInput } from './task-create-without-history-groups.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskCreateOrConnectWithoutHistoryGroupsInput {
  @Field(() => TaskWhereUniqueInput, { nullable: false })
  @Type(() => TaskWhereUniqueInput)
  where!: Prisma.AtLeast<TaskWhereUniqueInput, 'id'>;

  @Field(() => TaskCreateWithoutHistoryGroupsInput, { nullable: false })
  @Type(() => TaskCreateWithoutHistoryGroupsInput)
  create!: TaskCreateWithoutHistoryGroupsInput;
}
