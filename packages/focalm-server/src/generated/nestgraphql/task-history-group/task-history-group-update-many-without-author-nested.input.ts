import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupCreateManyAuthorInputEnvelope } from './task-history-group-create-many-author-input-envelope.input';
import { TaskHistoryGroupCreateOrConnectWithoutAuthorInput } from './task-history-group-create-or-connect-without-author.input';
import { TaskHistoryGroupCreateWithoutAuthorInput } from './task-history-group-create-without-author.input';
import { TaskHistoryGroupScalarWhereInput } from './task-history-group-scalar-where.input';
import { TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInput } from './task-history-group-update-many-with-where-without-author.input';
import { TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInput } from './task-history-group-update-with-where-unique-without-author.input';
import { TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInput } from './task-history-group-upsert-with-where-unique-without-author.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@InputType()
export class TaskHistoryGroupUpdateManyWithoutAuthorNestedInput {
  @Field(() => [TaskHistoryGroupCreateWithoutAuthorInput], { nullable: true })
  @Type(() => TaskHistoryGroupCreateWithoutAuthorInput)
  create?: Array<TaskHistoryGroupCreateWithoutAuthorInput>;

  @Field(() => [TaskHistoryGroupCreateOrConnectWithoutAuthorInput], { nullable: true })
  @Type(() => TaskHistoryGroupCreateOrConnectWithoutAuthorInput)
  connectOrCreate?: Array<TaskHistoryGroupCreateOrConnectWithoutAuthorInput>;

  @Field(() => [TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInput], { nullable: true })
  @Type(() => TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInput)
  upsert?: Array<TaskHistoryGroupUpsertWithWhereUniqueWithoutAuthorInput>;

  @Field(() => TaskHistoryGroupCreateManyAuthorInputEnvelope, { nullable: true })
  @Type(() => TaskHistoryGroupCreateManyAuthorInputEnvelope)
  createMany?: TaskHistoryGroupCreateManyAuthorInputEnvelope;

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

  @Field(() => [TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInput], { nullable: true })
  @Type(() => TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInput)
  update?: Array<TaskHistoryGroupUpdateWithWhereUniqueWithoutAuthorInput>;

  @Field(() => [TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInput], { nullable: true })
  @Type(() => TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInput)
  updateMany?: Array<TaskHistoryGroupUpdateManyWithWhereWithoutAuthorInput>;

  @Field(() => [TaskHistoryGroupScalarWhereInput], { nullable: true })
  @Type(() => TaskHistoryGroupScalarWhereInput)
  deleteMany?: Array<TaskHistoryGroupScalarWhereInput>;
}
