import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupCreateManyTaskInputEnvelope } from './task-history-group-create-many-task-input-envelope.input';
import { TaskHistoryGroupCreateOrConnectWithoutTaskInput } from './task-history-group-create-or-connect-without-task.input';
import { TaskHistoryGroupCreateWithoutTaskInput } from './task-history-group-create-without-task.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@InputType()
export class TaskHistoryGroupCreateNestedManyWithoutTaskInput {
  @Field(() => [TaskHistoryGroupCreateWithoutTaskInput], { nullable: true })
  @Type(() => TaskHistoryGroupCreateWithoutTaskInput)
  create?: Array<TaskHistoryGroupCreateWithoutTaskInput>;

  @Field(() => [TaskHistoryGroupCreateOrConnectWithoutTaskInput], { nullable: true })
  @Type(() => TaskHistoryGroupCreateOrConnectWithoutTaskInput)
  connectOrCreate?: Array<TaskHistoryGroupCreateOrConnectWithoutTaskInput>;

  @Field(() => TaskHistoryGroupCreateManyTaskInputEnvelope, { nullable: true })
  @Type(() => TaskHistoryGroupCreateManyTaskInputEnvelope)
  createMany?: TaskHistoryGroupCreateManyTaskInputEnvelope;

  @Field(() => [TaskHistoryGroupWhereUniqueInput], { nullable: true })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>>;
}
