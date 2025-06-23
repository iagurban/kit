import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationTypeCreateManyProjectInputEnvelope } from './task-to-task-relation-type-create-many-project-input-envelope.input';
import { TaskToTaskRelationTypeCreateOrConnectWithoutProjectInput } from './task-to-task-relation-type-create-or-connect-without-project.input';
import { TaskToTaskRelationTypeCreateWithoutProjectInput } from './task-to-task-relation-type-create-without-project.input';
import { TaskToTaskRelationTypeScalarWhereInput } from './task-to-task-relation-type-scalar-where.input';
import { TaskToTaskRelationTypeUpdateManyWithWhereWithoutProjectInput } from './task-to-task-relation-type-update-many-with-where-without-project.input';
import { TaskToTaskRelationTypeUpdateWithWhereUniqueWithoutProjectInput } from './task-to-task-relation-type-update-with-where-unique-without-project.input';
import { TaskToTaskRelationTypeUpsertWithWhereUniqueWithoutProjectInput } from './task-to-task-relation-type-upsert-with-where-unique-without-project.input';
import { TaskToTaskRelationTypeWhereUniqueInput } from './task-to-task-relation-type-where-unique.input';

@InputType()
export class TaskToTaskRelationTypeUpdateManyWithoutProjectNestedInput {
  @Field(() => [TaskToTaskRelationTypeCreateWithoutProjectInput], { nullable: true })
  @Type(() => TaskToTaskRelationTypeCreateWithoutProjectInput)
  create?: Array<TaskToTaskRelationTypeCreateWithoutProjectInput>;

  @Field(() => [TaskToTaskRelationTypeCreateOrConnectWithoutProjectInput], { nullable: true })
  @Type(() => TaskToTaskRelationTypeCreateOrConnectWithoutProjectInput)
  connectOrCreate?: Array<TaskToTaskRelationTypeCreateOrConnectWithoutProjectInput>;

  @Field(() => [TaskToTaskRelationTypeUpsertWithWhereUniqueWithoutProjectInput], { nullable: true })
  @Type(() => TaskToTaskRelationTypeUpsertWithWhereUniqueWithoutProjectInput)
  upsert?: Array<TaskToTaskRelationTypeUpsertWithWhereUniqueWithoutProjectInput>;

  @Field(() => TaskToTaskRelationTypeCreateManyProjectInputEnvelope, { nullable: true })
  @Type(() => TaskToTaskRelationTypeCreateManyProjectInputEnvelope)
  createMany?: TaskToTaskRelationTypeCreateManyProjectInputEnvelope;

  @Field(() => [TaskToTaskRelationTypeWhereUniqueInput], { nullable: true })
  @Type(() => TaskToTaskRelationTypeWhereUniqueInput)
  set?: Array<Prisma.AtLeast<TaskToTaskRelationTypeWhereUniqueInput, 'id'>>;

  @Field(() => [TaskToTaskRelationTypeWhereUniqueInput], { nullable: true })
  @Type(() => TaskToTaskRelationTypeWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<TaskToTaskRelationTypeWhereUniqueInput, 'id'>>;

  @Field(() => [TaskToTaskRelationTypeWhereUniqueInput], { nullable: true })
  @Type(() => TaskToTaskRelationTypeWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<TaskToTaskRelationTypeWhereUniqueInput, 'id'>>;

  @Field(() => [TaskToTaskRelationTypeWhereUniqueInput], { nullable: true })
  @Type(() => TaskToTaskRelationTypeWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskToTaskRelationTypeWhereUniqueInput, 'id'>>;

  @Field(() => [TaskToTaskRelationTypeUpdateWithWhereUniqueWithoutProjectInput], { nullable: true })
  @Type(() => TaskToTaskRelationTypeUpdateWithWhereUniqueWithoutProjectInput)
  update?: Array<TaskToTaskRelationTypeUpdateWithWhereUniqueWithoutProjectInput>;

  @Field(() => [TaskToTaskRelationTypeUpdateManyWithWhereWithoutProjectInput], { nullable: true })
  @Type(() => TaskToTaskRelationTypeUpdateManyWithWhereWithoutProjectInput)
  updateMany?: Array<TaskToTaskRelationTypeUpdateManyWithWhereWithoutProjectInput>;

  @Field(() => [TaskToTaskRelationTypeScalarWhereInput], { nullable: true })
  @Type(() => TaskToTaskRelationTypeScalarWhereInput)
  deleteMany?: Array<TaskToTaskRelationTypeScalarWhereInput>;
}
