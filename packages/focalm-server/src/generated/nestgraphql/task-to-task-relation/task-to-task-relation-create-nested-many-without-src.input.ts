import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationCreateManySrcInputEnvelope } from './task-to-task-relation-create-many-src-input-envelope.input';
import { TaskToTaskRelationCreateOrConnectWithoutSrcInput } from './task-to-task-relation-create-or-connect-without-src.input';
import { TaskToTaskRelationCreateWithoutSrcInput } from './task-to-task-relation-create-without-src.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@InputType()
export class TaskToTaskRelationCreateNestedManyWithoutSrcInput {
  @Field(() => [TaskToTaskRelationCreateWithoutSrcInput], { nullable: true })
  @Type(() => TaskToTaskRelationCreateWithoutSrcInput)
  create?: Array<TaskToTaskRelationCreateWithoutSrcInput>;

  @Field(() => [TaskToTaskRelationCreateOrConnectWithoutSrcInput], { nullable: true })
  @Type(() => TaskToTaskRelationCreateOrConnectWithoutSrcInput)
  connectOrCreate?: Array<TaskToTaskRelationCreateOrConnectWithoutSrcInput>;

  @Field(() => TaskToTaskRelationCreateManySrcInputEnvelope, { nullable: true })
  @Type(() => TaskToTaskRelationCreateManySrcInputEnvelope)
  createMany?: TaskToTaskRelationCreateManySrcInputEnvelope;

  @Field(() => [TaskToTaskRelationWhereUniqueInput], { nullable: true })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>>;
}
