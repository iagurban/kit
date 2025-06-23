import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationCreateManyDstInputEnvelope } from './task-to-task-relation-create-many-dst-input-envelope.input';
import { TaskToTaskRelationCreateOrConnectWithoutDstInput } from './task-to-task-relation-create-or-connect-without-dst.input';
import { TaskToTaskRelationCreateWithoutDstInput } from './task-to-task-relation-create-without-dst.input';
import { TaskToTaskRelationScalarWhereInput } from './task-to-task-relation-scalar-where.input';
import { TaskToTaskRelationUpdateManyWithWhereWithoutDstInput } from './task-to-task-relation-update-many-with-where-without-dst.input';
import { TaskToTaskRelationUpdateWithWhereUniqueWithoutDstInput } from './task-to-task-relation-update-with-where-unique-without-dst.input';
import { TaskToTaskRelationUpsertWithWhereUniqueWithoutDstInput } from './task-to-task-relation-upsert-with-where-unique-without-dst.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@InputType()
export class TaskToTaskRelationUpdateManyWithoutDstNestedInput {
  @Field(() => [TaskToTaskRelationCreateWithoutDstInput], { nullable: true })
  @Type(() => TaskToTaskRelationCreateWithoutDstInput)
  create?: Array<TaskToTaskRelationCreateWithoutDstInput>;

  @Field(() => [TaskToTaskRelationCreateOrConnectWithoutDstInput], { nullable: true })
  @Type(() => TaskToTaskRelationCreateOrConnectWithoutDstInput)
  connectOrCreate?: Array<TaskToTaskRelationCreateOrConnectWithoutDstInput>;

  @Field(() => [TaskToTaskRelationUpsertWithWhereUniqueWithoutDstInput], { nullable: true })
  @Type(() => TaskToTaskRelationUpsertWithWhereUniqueWithoutDstInput)
  upsert?: Array<TaskToTaskRelationUpsertWithWhereUniqueWithoutDstInput>;

  @Field(() => TaskToTaskRelationCreateManyDstInputEnvelope, { nullable: true })
  @Type(() => TaskToTaskRelationCreateManyDstInputEnvelope)
  createMany?: TaskToTaskRelationCreateManyDstInputEnvelope;

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

  @Field(() => [TaskToTaskRelationUpdateWithWhereUniqueWithoutDstInput], { nullable: true })
  @Type(() => TaskToTaskRelationUpdateWithWhereUniqueWithoutDstInput)
  update?: Array<TaskToTaskRelationUpdateWithWhereUniqueWithoutDstInput>;

  @Field(() => [TaskToTaskRelationUpdateManyWithWhereWithoutDstInput], { nullable: true })
  @Type(() => TaskToTaskRelationUpdateManyWithWhereWithoutDstInput)
  updateMany?: Array<TaskToTaskRelationUpdateManyWithWhereWithoutDstInput>;

  @Field(() => [TaskToTaskRelationScalarWhereInput], { nullable: true })
  @Type(() => TaskToTaskRelationScalarWhereInput)
  deleteMany?: Array<TaskToTaskRelationScalarWhereInput>;
}
