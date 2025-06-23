import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueCreateManyTaskInputEnvelope } from './task-history-value-create-many-task-input-envelope.input';
import { TaskHistoryValueCreateOrConnectWithoutTaskInput } from './task-history-value-create-or-connect-without-task.input';
import { TaskHistoryValueCreateWithoutTaskInput } from './task-history-value-create-without-task.input';
import { TaskHistoryValueScalarWhereInput } from './task-history-value-scalar-where.input';
import { TaskHistoryValueUpdateManyWithWhereWithoutTaskInput } from './task-history-value-update-many-with-where-without-task.input';
import { TaskHistoryValueUpdateWithWhereUniqueWithoutTaskInput } from './task-history-value-update-with-where-unique-without-task.input';
import { TaskHistoryValueUpsertWithWhereUniqueWithoutTaskInput } from './task-history-value-upsert-with-where-unique-without-task.input';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@InputType()
export class TaskHistoryValueUpdateManyWithoutTaskNestedInput {
  @Field(() => [TaskHistoryValueCreateWithoutTaskInput], { nullable: true })
  @Type(() => TaskHistoryValueCreateWithoutTaskInput)
  create?: Array<TaskHistoryValueCreateWithoutTaskInput>;

  @Field(() => [TaskHistoryValueCreateOrConnectWithoutTaskInput], { nullable: true })
  @Type(() => TaskHistoryValueCreateOrConnectWithoutTaskInput)
  connectOrCreate?: Array<TaskHistoryValueCreateOrConnectWithoutTaskInput>;

  @Field(() => [TaskHistoryValueUpsertWithWhereUniqueWithoutTaskInput], { nullable: true })
  @Type(() => TaskHistoryValueUpsertWithWhereUniqueWithoutTaskInput)
  upsert?: Array<TaskHistoryValueUpsertWithWhereUniqueWithoutTaskInput>;

  @Field(() => TaskHistoryValueCreateManyTaskInputEnvelope, { nullable: true })
  @Type(() => TaskHistoryValueCreateManyTaskInputEnvelope)
  createMany?: TaskHistoryValueCreateManyTaskInputEnvelope;

  @Field(() => [TaskHistoryValueWhereUniqueInput], { nullable: true })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  set?: Array<Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'id'>>;

  @Field(() => [TaskHistoryValueWhereUniqueInput], { nullable: true })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'id'>>;

  @Field(() => [TaskHistoryValueWhereUniqueInput], { nullable: true })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'id'>>;

  @Field(() => [TaskHistoryValueWhereUniqueInput], { nullable: true })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'id'>>;

  @Field(() => [TaskHistoryValueUpdateWithWhereUniqueWithoutTaskInput], { nullable: true })
  @Type(() => TaskHistoryValueUpdateWithWhereUniqueWithoutTaskInput)
  update?: Array<TaskHistoryValueUpdateWithWhereUniqueWithoutTaskInput>;

  @Field(() => [TaskHistoryValueUpdateManyWithWhereWithoutTaskInput], { nullable: true })
  @Type(() => TaskHistoryValueUpdateManyWithWhereWithoutTaskInput)
  updateMany?: Array<TaskHistoryValueUpdateManyWithWhereWithoutTaskInput>;

  @Field(() => [TaskHistoryValueScalarWhereInput], { nullable: true })
  @Type(() => TaskHistoryValueScalarWhereInput)
  deleteMany?: Array<TaskHistoryValueScalarWhereInput>;
}
