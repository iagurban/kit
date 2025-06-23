import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationCreateManyTypeInputEnvelope } from './task-to-task-relation-create-many-type-input-envelope.input';
import { TaskToTaskRelationCreateOrConnectWithoutTypeInput } from './task-to-task-relation-create-or-connect-without-type.input';
import { TaskToTaskRelationCreateWithoutTypeInput } from './task-to-task-relation-create-without-type.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@InputType()
export class TaskToTaskRelationCreateNestedManyWithoutTypeInput {
  @Field(() => [TaskToTaskRelationCreateWithoutTypeInput], { nullable: true })
  @Type(() => TaskToTaskRelationCreateWithoutTypeInput)
  create?: Array<TaskToTaskRelationCreateWithoutTypeInput>;

  @Field(() => [TaskToTaskRelationCreateOrConnectWithoutTypeInput], { nullable: true })
  @Type(() => TaskToTaskRelationCreateOrConnectWithoutTypeInput)
  connectOrCreate?: Array<TaskToTaskRelationCreateOrConnectWithoutTypeInput>;

  @Field(() => TaskToTaskRelationCreateManyTypeInputEnvelope, { nullable: true })
  @Type(() => TaskToTaskRelationCreateManyTypeInputEnvelope)
  createMany?: TaskToTaskRelationCreateManyTypeInputEnvelope;

  @Field(() => [TaskToTaskRelationWhereUniqueInput], { nullable: true })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>>;
}
