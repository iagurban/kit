import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueCreateManyTaskInputEnvelope } from './task-history-value-create-many-task-input-envelope.input';
import { TaskHistoryValueCreateOrConnectWithoutTaskInput } from './task-history-value-create-or-connect-without-task.input';
import { TaskHistoryValueCreateWithoutTaskInput } from './task-history-value-create-without-task.input';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@InputType()
export class TaskHistoryValueUncheckedCreateNestedManyWithoutTaskInput {
  @Field(() => [TaskHistoryValueCreateWithoutTaskInput], { nullable: true })
  @Type(() => TaskHistoryValueCreateWithoutTaskInput)
  create?: Array<TaskHistoryValueCreateWithoutTaskInput>;

  @Field(() => [TaskHistoryValueCreateOrConnectWithoutTaskInput], { nullable: true })
  @Type(() => TaskHistoryValueCreateOrConnectWithoutTaskInput)
  connectOrCreate?: Array<TaskHistoryValueCreateOrConnectWithoutTaskInput>;

  @Field(() => TaskHistoryValueCreateManyTaskInputEnvelope, { nullable: true })
  @Type(() => TaskHistoryValueCreateManyTaskInputEnvelope)
  createMany?: TaskHistoryValueCreateManyTaskInputEnvelope;

  @Field(() => [TaskHistoryValueWhereUniqueInput], { nullable: true })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'id'>>;
}
