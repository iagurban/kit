import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateManyResponsibleInputEnvelope } from './task-create-many-responsible-input-envelope.input';
import { TaskCreateOrConnectWithoutResponsibleInput } from './task-create-or-connect-without-responsible.input';
import { TaskCreateWithoutResponsibleInput } from './task-create-without-responsible.input';
import { TaskScalarWhereInput } from './task-scalar-where.input';
import { TaskUpdateManyWithWhereWithoutResponsibleInput } from './task-update-many-with-where-without-responsible.input';
import { TaskUpdateWithWhereUniqueWithoutResponsibleInput } from './task-update-with-where-unique-without-responsible.input';
import { TaskUpsertWithWhereUniqueWithoutResponsibleInput } from './task-upsert-with-where-unique-without-responsible.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUpdateManyWithoutResponsibleNestedInput {
  @Field(() => [TaskCreateWithoutResponsibleInput], { nullable: true })
  @Type(() => TaskCreateWithoutResponsibleInput)
  create?: Array<TaskCreateWithoutResponsibleInput>;

  @Field(() => [TaskCreateOrConnectWithoutResponsibleInput], { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutResponsibleInput)
  connectOrCreate?: Array<TaskCreateOrConnectWithoutResponsibleInput>;

  @Field(() => [TaskUpsertWithWhereUniqueWithoutResponsibleInput], { nullable: true })
  @Type(() => TaskUpsertWithWhereUniqueWithoutResponsibleInput)
  upsert?: Array<TaskUpsertWithWhereUniqueWithoutResponsibleInput>;

  @Field(() => TaskCreateManyResponsibleInputEnvelope, { nullable: true })
  @Type(() => TaskCreateManyResponsibleInputEnvelope)
  createMany?: TaskCreateManyResponsibleInputEnvelope;

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

  @Field(() => [TaskUpdateWithWhereUniqueWithoutResponsibleInput], { nullable: true })
  @Type(() => TaskUpdateWithWhereUniqueWithoutResponsibleInput)
  update?: Array<TaskUpdateWithWhereUniqueWithoutResponsibleInput>;

  @Field(() => [TaskUpdateManyWithWhereWithoutResponsibleInput], { nullable: true })
  @Type(() => TaskUpdateManyWithWhereWithoutResponsibleInput)
  updateMany?: Array<TaskUpdateManyWithWhereWithoutResponsibleInput>;

  @Field(() => [TaskScalarWhereInput], { nullable: true })
  @Type(() => TaskScalarWhereInput)
  deleteMany?: Array<TaskScalarWhereInput>;
}
