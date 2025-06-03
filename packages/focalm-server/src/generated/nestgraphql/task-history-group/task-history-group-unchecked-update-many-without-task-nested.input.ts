import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupCreateManyTaskInputEnvelope } from './task-history-group-create-many-task-input-envelope.input';
import { TaskHistoryGroupCreateOrConnectWithoutTaskInput } from './task-history-group-create-or-connect-without-task.input';
import { TaskHistoryGroupCreateWithoutTaskInput } from './task-history-group-create-without-task.input';
import { TaskHistoryGroupScalarWhereInput } from './task-history-group-scalar-where.input';
import { TaskHistoryGroupUpdateManyWithWhereWithoutTaskInput } from './task-history-group-update-many-with-where-without-task.input';
import { TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInput } from './task-history-group-update-with-where-unique-without-task.input';
import { TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInput } from './task-history-group-upsert-with-where-unique-without-task.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@InputType()
export class TaskHistoryGroupUncheckedUpdateManyWithoutTaskNestedInput {
  @Field(() => [TaskHistoryGroupCreateWithoutTaskInput], { nullable: true })
  @Type(() => TaskHistoryGroupCreateWithoutTaskInput)
  create?: Array<TaskHistoryGroupCreateWithoutTaskInput>;

  @Field(() => [TaskHistoryGroupCreateOrConnectWithoutTaskInput], { nullable: true })
  @Type(() => TaskHistoryGroupCreateOrConnectWithoutTaskInput)
  connectOrCreate?: Array<TaskHistoryGroupCreateOrConnectWithoutTaskInput>;

  @Field(() => [TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInput], { nullable: true })
  @Type(() => TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInput)
  upsert?: Array<TaskHistoryGroupUpsertWithWhereUniqueWithoutTaskInput>;

  @Field(() => TaskHistoryGroupCreateManyTaskInputEnvelope, { nullable: true })
  @Type(() => TaskHistoryGroupCreateManyTaskInputEnvelope)
  createMany?: TaskHistoryGroupCreateManyTaskInputEnvelope;

  @Field(() => [TaskHistoryGroupWhereUniqueInput], { nullable: true })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  set?: Array<Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>>;

  @Field(() => [TaskHistoryGroupWhereUniqueInput], { nullable: true })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>>;

  @Field(() => [TaskHistoryGroupWhereUniqueInput], { nullable: true })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>>;

  @Field(() => [TaskHistoryGroupWhereUniqueInput], { nullable: true })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>>;

  @Field(() => [TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInput], { nullable: true })
  @Type(() => TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInput)
  update?: Array<TaskHistoryGroupUpdateWithWhereUniqueWithoutTaskInput>;

  @Field(() => [TaskHistoryGroupUpdateManyWithWhereWithoutTaskInput], { nullable: true })
  @Type(() => TaskHistoryGroupUpdateManyWithWhereWithoutTaskInput)
  updateMany?: Array<TaskHistoryGroupUpdateManyWithWhereWithoutTaskInput>;

  @Field(() => [TaskHistoryGroupScalarWhereInput], { nullable: true })
  @Type(() => TaskHistoryGroupScalarWhereInput)
  deleteMany?: Array<TaskHistoryGroupScalarWhereInput>;
}
