import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationCreateManyTypeInputEnvelope } from './task-to-task-relation-create-many-type-input-envelope.input';
import { TaskToTaskRelationCreateOrConnectWithoutTypeInput } from './task-to-task-relation-create-or-connect-without-type.input';
import { TaskToTaskRelationCreateWithoutTypeInput } from './task-to-task-relation-create-without-type.input';
import { TaskToTaskRelationScalarWhereInput } from './task-to-task-relation-scalar-where.input';
import { TaskToTaskRelationUpdateManyWithWhereWithoutTypeInput } from './task-to-task-relation-update-many-with-where-without-type.input';
import { TaskToTaskRelationUpdateWithWhereUniqueWithoutTypeInput } from './task-to-task-relation-update-with-where-unique-without-type.input';
import { TaskToTaskRelationUpsertWithWhereUniqueWithoutTypeInput } from './task-to-task-relation-upsert-with-where-unique-without-type.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@InputType()
export class TaskToTaskRelationUncheckedUpdateManyWithoutTypeNestedInput {
  @Field(() => [TaskToTaskRelationCreateWithoutTypeInput], { nullable: true })
  @Type(() => TaskToTaskRelationCreateWithoutTypeInput)
  create?: Array<TaskToTaskRelationCreateWithoutTypeInput>;

  @Field(() => [TaskToTaskRelationCreateOrConnectWithoutTypeInput], { nullable: true })
  @Type(() => TaskToTaskRelationCreateOrConnectWithoutTypeInput)
  connectOrCreate?: Array<TaskToTaskRelationCreateOrConnectWithoutTypeInput>;

  @Field(() => [TaskToTaskRelationUpsertWithWhereUniqueWithoutTypeInput], { nullable: true })
  @Type(() => TaskToTaskRelationUpsertWithWhereUniqueWithoutTypeInput)
  upsert?: Array<TaskToTaskRelationUpsertWithWhereUniqueWithoutTypeInput>;

  @Field(() => TaskToTaskRelationCreateManyTypeInputEnvelope, { nullable: true })
  @Type(() => TaskToTaskRelationCreateManyTypeInputEnvelope)
  createMany?: TaskToTaskRelationCreateManyTypeInputEnvelope;

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

  @Field(() => [TaskToTaskRelationUpdateWithWhereUniqueWithoutTypeInput], { nullable: true })
  @Type(() => TaskToTaskRelationUpdateWithWhereUniqueWithoutTypeInput)
  update?: Array<TaskToTaskRelationUpdateWithWhereUniqueWithoutTypeInput>;

  @Field(() => [TaskToTaskRelationUpdateManyWithWhereWithoutTypeInput], { nullable: true })
  @Type(() => TaskToTaskRelationUpdateManyWithWhereWithoutTypeInput)
  updateMany?: Array<TaskToTaskRelationUpdateManyWithWhereWithoutTypeInput>;

  @Field(() => [TaskToTaskRelationScalarWhereInput], { nullable: true })
  @Type(() => TaskToTaskRelationScalarWhereInput)
  deleteMany?: Array<TaskToTaskRelationScalarWhereInput>;
}
