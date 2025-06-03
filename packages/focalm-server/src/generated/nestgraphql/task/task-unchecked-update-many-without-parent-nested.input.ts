import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateManyParentInputEnvelope } from './task-create-many-parent-input-envelope.input';
import { TaskCreateOrConnectWithoutParentInput } from './task-create-or-connect-without-parent.input';
import { TaskCreateWithoutParentInput } from './task-create-without-parent.input';
import { TaskScalarWhereInput } from './task-scalar-where.input';
import { TaskUpdateManyWithWhereWithoutParentInput } from './task-update-many-with-where-without-parent.input';
import { TaskUpdateWithWhereUniqueWithoutParentInput } from './task-update-with-where-unique-without-parent.input';
import { TaskUpsertWithWhereUniqueWithoutParentInput } from './task-upsert-with-where-unique-without-parent.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUncheckedUpdateManyWithoutParentNestedInput {
  @Field(() => [TaskCreateWithoutParentInput], { nullable: true })
  @Type(() => TaskCreateWithoutParentInput)
  create?: Array<TaskCreateWithoutParentInput>;

  @Field(() => [TaskCreateOrConnectWithoutParentInput], { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutParentInput)
  connectOrCreate?: Array<TaskCreateOrConnectWithoutParentInput>;

  @Field(() => [TaskUpsertWithWhereUniqueWithoutParentInput], { nullable: true })
  @Type(() => TaskUpsertWithWhereUniqueWithoutParentInput)
  upsert?: Array<TaskUpsertWithWhereUniqueWithoutParentInput>;

  @Field(() => TaskCreateManyParentInputEnvelope, { nullable: true })
  @Type(() => TaskCreateManyParentInputEnvelope)
  createMany?: TaskCreateManyParentInputEnvelope;

  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  set?: Array<Prisma.AtLeast<TaskWhereUniqueInput, 'id'>>;

  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<TaskWhereUniqueInput, 'id'>>;

  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<TaskWhereUniqueInput, 'id'>>;

  @Field(() => [TaskWhereUniqueInput], { nullable: true })
  @Type(() => TaskWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskWhereUniqueInput, 'id'>>;

  @Field(() => [TaskUpdateWithWhereUniqueWithoutParentInput], { nullable: true })
  @Type(() => TaskUpdateWithWhereUniqueWithoutParentInput)
  update?: Array<TaskUpdateWithWhereUniqueWithoutParentInput>;

  @Field(() => [TaskUpdateManyWithWhereWithoutParentInput], { nullable: true })
  @Type(() => TaskUpdateManyWithWhereWithoutParentInput)
  updateMany?: Array<TaskUpdateManyWithWhereWithoutParentInput>;

  @Field(() => [TaskScalarWhereInput], { nullable: true })
  @Type(() => TaskScalarWhereInput)
  deleteMany?: Array<TaskScalarWhereInput>;
}
