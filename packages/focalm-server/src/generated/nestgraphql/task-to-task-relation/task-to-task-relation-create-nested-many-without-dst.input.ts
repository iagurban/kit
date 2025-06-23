import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationCreateManyDstInputEnvelope } from './task-to-task-relation-create-many-dst-input-envelope.input';
import { TaskToTaskRelationCreateOrConnectWithoutDstInput } from './task-to-task-relation-create-or-connect-without-dst.input';
import { TaskToTaskRelationCreateWithoutDstInput } from './task-to-task-relation-create-without-dst.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@InputType()
export class TaskToTaskRelationCreateNestedManyWithoutDstInput {
  @Field(() => [TaskToTaskRelationCreateWithoutDstInput], { nullable: true })
  @Type(() => TaskToTaskRelationCreateWithoutDstInput)
  create?: Array<TaskToTaskRelationCreateWithoutDstInput>;

  @Field(() => [TaskToTaskRelationCreateOrConnectWithoutDstInput], { nullable: true })
  @Type(() => TaskToTaskRelationCreateOrConnectWithoutDstInput)
  connectOrCreate?: Array<TaskToTaskRelationCreateOrConnectWithoutDstInput>;

  @Field(() => TaskToTaskRelationCreateManyDstInputEnvelope, { nullable: true })
  @Type(() => TaskToTaskRelationCreateManyDstInputEnvelope)
  createMany?: TaskToTaskRelationCreateManyDstInputEnvelope;

  @Field(() => [TaskToTaskRelationWhereUniqueInput], { nullable: true })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>>;
}
