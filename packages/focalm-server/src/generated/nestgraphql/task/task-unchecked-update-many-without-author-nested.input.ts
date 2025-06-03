import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskCreateManyAuthorInputEnvelope } from './task-create-many-author-input-envelope.input';
import { TaskCreateOrConnectWithoutAuthorInput } from './task-create-or-connect-without-author.input';
import { TaskCreateWithoutAuthorInput } from './task-create-without-author.input';
import { TaskScalarWhereInput } from './task-scalar-where.input';
import { TaskUpdateManyWithWhereWithoutAuthorInput } from './task-update-many-with-where-without-author.input';
import { TaskUpdateWithWhereUniqueWithoutAuthorInput } from './task-update-with-where-unique-without-author.input';
import { TaskUpsertWithWhereUniqueWithoutAuthorInput } from './task-upsert-with-where-unique-without-author.input';
import { TaskWhereUniqueInput } from './task-where-unique.input';

@InputType()
export class TaskUncheckedUpdateManyWithoutAuthorNestedInput {
  @Field(() => [TaskCreateWithoutAuthorInput], { nullable: true })
  @Type(() => TaskCreateWithoutAuthorInput)
  create?: Array<TaskCreateWithoutAuthorInput>;

  @Field(() => [TaskCreateOrConnectWithoutAuthorInput], { nullable: true })
  @Type(() => TaskCreateOrConnectWithoutAuthorInput)
  connectOrCreate?: Array<TaskCreateOrConnectWithoutAuthorInput>;

  @Field(() => [TaskUpsertWithWhereUniqueWithoutAuthorInput], { nullable: true })
  @Type(() => TaskUpsertWithWhereUniqueWithoutAuthorInput)
  upsert?: Array<TaskUpsertWithWhereUniqueWithoutAuthorInput>;

  @Field(() => TaskCreateManyAuthorInputEnvelope, { nullable: true })
  @Type(() => TaskCreateManyAuthorInputEnvelope)
  createMany?: TaskCreateManyAuthorInputEnvelope;

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

  @Field(() => [TaskUpdateWithWhereUniqueWithoutAuthorInput], { nullable: true })
  @Type(() => TaskUpdateWithWhereUniqueWithoutAuthorInput)
  update?: Array<TaskUpdateWithWhereUniqueWithoutAuthorInput>;

  @Field(() => [TaskUpdateManyWithWhereWithoutAuthorInput], { nullable: true })
  @Type(() => TaskUpdateManyWithWhereWithoutAuthorInput)
  updateMany?: Array<TaskUpdateManyWithWhereWithoutAuthorInput>;

  @Field(() => [TaskScalarWhereInput], { nullable: true })
  @Type(() => TaskScalarWhereInput)
  deleteMany?: Array<TaskScalarWhereInput>;
}
