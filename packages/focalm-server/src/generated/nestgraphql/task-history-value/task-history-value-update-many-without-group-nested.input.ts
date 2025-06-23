import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueCreateManyGroupInputEnvelope } from './task-history-value-create-many-group-input-envelope.input';
import { TaskHistoryValueCreateOrConnectWithoutGroupInput } from './task-history-value-create-or-connect-without-group.input';
import { TaskHistoryValueCreateWithoutGroupInput } from './task-history-value-create-without-group.input';
import { TaskHistoryValueScalarWhereInput } from './task-history-value-scalar-where.input';
import { TaskHistoryValueUpdateManyWithWhereWithoutGroupInput } from './task-history-value-update-many-with-where-without-group.input';
import { TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInput } from './task-history-value-update-with-where-unique-without-group.input';
import { TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInput } from './task-history-value-upsert-with-where-unique-without-group.input';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@InputType()
export class TaskHistoryValueUpdateManyWithoutGroupNestedInput {
  @Field(() => [TaskHistoryValueCreateWithoutGroupInput], { nullable: true })
  @Type(() => TaskHistoryValueCreateWithoutGroupInput)
  create?: Array<TaskHistoryValueCreateWithoutGroupInput>;

  @Field(() => [TaskHistoryValueCreateOrConnectWithoutGroupInput], { nullable: true })
  @Type(() => TaskHistoryValueCreateOrConnectWithoutGroupInput)
  connectOrCreate?: Array<TaskHistoryValueCreateOrConnectWithoutGroupInput>;

  @Field(() => [TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInput], { nullable: true })
  @Type(() => TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInput)
  upsert?: Array<TaskHistoryValueUpsertWithWhereUniqueWithoutGroupInput>;

  @Field(() => TaskHistoryValueCreateManyGroupInputEnvelope, { nullable: true })
  @Type(() => TaskHistoryValueCreateManyGroupInputEnvelope)
  createMany?: TaskHistoryValueCreateManyGroupInputEnvelope;

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

  @Field(() => [TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInput], { nullable: true })
  @Type(() => TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInput)
  update?: Array<TaskHistoryValueUpdateWithWhereUniqueWithoutGroupInput>;

  @Field(() => [TaskHistoryValueUpdateManyWithWhereWithoutGroupInput], { nullable: true })
  @Type(() => TaskHistoryValueUpdateManyWithWhereWithoutGroupInput)
  updateMany?: Array<TaskHistoryValueUpdateManyWithWhereWithoutGroupInput>;

  @Field(() => [TaskHistoryValueScalarWhereInput], { nullable: true })
  @Type(() => TaskHistoryValueScalarWhereInput)
  deleteMany?: Array<TaskHistoryValueScalarWhereInput>;
}
