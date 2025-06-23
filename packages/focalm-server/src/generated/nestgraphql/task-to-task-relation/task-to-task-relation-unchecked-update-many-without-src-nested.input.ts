import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationCreateManySrcInputEnvelope } from './task-to-task-relation-create-many-src-input-envelope.input';
import { TaskToTaskRelationCreateOrConnectWithoutSrcInput } from './task-to-task-relation-create-or-connect-without-src.input';
import { TaskToTaskRelationCreateWithoutSrcInput } from './task-to-task-relation-create-without-src.input';
import { TaskToTaskRelationScalarWhereInput } from './task-to-task-relation-scalar-where.input';
import { TaskToTaskRelationUpdateManyWithWhereWithoutSrcInput } from './task-to-task-relation-update-many-with-where-without-src.input';
import { TaskToTaskRelationUpdateWithWhereUniqueWithoutSrcInput } from './task-to-task-relation-update-with-where-unique-without-src.input';
import { TaskToTaskRelationUpsertWithWhereUniqueWithoutSrcInput } from './task-to-task-relation-upsert-with-where-unique-without-src.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@InputType()
export class TaskToTaskRelationUncheckedUpdateManyWithoutSrcNestedInput {
  @Field(() => [TaskToTaskRelationCreateWithoutSrcInput], { nullable: true })
  @Type(() => TaskToTaskRelationCreateWithoutSrcInput)
  create?: Array<TaskToTaskRelationCreateWithoutSrcInput>;

  @Field(() => [TaskToTaskRelationCreateOrConnectWithoutSrcInput], { nullable: true })
  @Type(() => TaskToTaskRelationCreateOrConnectWithoutSrcInput)
  connectOrCreate?: Array<TaskToTaskRelationCreateOrConnectWithoutSrcInput>;

  @Field(() => [TaskToTaskRelationUpsertWithWhereUniqueWithoutSrcInput], { nullable: true })
  @Type(() => TaskToTaskRelationUpsertWithWhereUniqueWithoutSrcInput)
  upsert?: Array<TaskToTaskRelationUpsertWithWhereUniqueWithoutSrcInput>;

  @Field(() => TaskToTaskRelationCreateManySrcInputEnvelope, { nullable: true })
  @Type(() => TaskToTaskRelationCreateManySrcInputEnvelope)
  createMany?: TaskToTaskRelationCreateManySrcInputEnvelope;

  @Field(() => [TaskToTaskRelationWhereUniqueInput], { nullable: true })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  set?: Array<Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>>;

  @Field(() => [TaskToTaskRelationWhereUniqueInput], { nullable: true })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>>;

  @Field(() => [TaskToTaskRelationWhereUniqueInput], { nullable: true })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>>;

  @Field(() => [TaskToTaskRelationWhereUniqueInput], { nullable: true })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>>;

  @Field(() => [TaskToTaskRelationUpdateWithWhereUniqueWithoutSrcInput], { nullable: true })
  @Type(() => TaskToTaskRelationUpdateWithWhereUniqueWithoutSrcInput)
  update?: Array<TaskToTaskRelationUpdateWithWhereUniqueWithoutSrcInput>;

  @Field(() => [TaskToTaskRelationUpdateManyWithWhereWithoutSrcInput], { nullable: true })
  @Type(() => TaskToTaskRelationUpdateManyWithWhereWithoutSrcInput)
  updateMany?: Array<TaskToTaskRelationUpdateManyWithWhereWithoutSrcInput>;

  @Field(() => [TaskToTaskRelationScalarWhereInput], { nullable: true })
  @Type(() => TaskToTaskRelationScalarWhereInput)
  deleteMany?: Array<TaskToTaskRelationScalarWhereInput>;
}
