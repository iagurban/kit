import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationTypeCreateManyProjectInputEnvelope } from './task-to-task-relation-type-create-many-project-input-envelope.input';
import { TaskToTaskRelationTypeCreateOrConnectWithoutProjectInput } from './task-to-task-relation-type-create-or-connect-without-project.input';
import { TaskToTaskRelationTypeCreateWithoutProjectInput } from './task-to-task-relation-type-create-without-project.input';
import { TaskToTaskRelationTypeWhereUniqueInput } from './task-to-task-relation-type-where-unique.input';

@InputType()
export class TaskToTaskRelationTypeCreateNestedManyWithoutProjectInput {
  @Field(() => [TaskToTaskRelationTypeCreateWithoutProjectInput], { nullable: true })
  @Type(() => TaskToTaskRelationTypeCreateWithoutProjectInput)
  create?: Array<TaskToTaskRelationTypeCreateWithoutProjectInput>;

  @Field(() => [TaskToTaskRelationTypeCreateOrConnectWithoutProjectInput], { nullable: true })
  @Type(() => TaskToTaskRelationTypeCreateOrConnectWithoutProjectInput)
  connectOrCreate?: Array<TaskToTaskRelationTypeCreateOrConnectWithoutProjectInput>;

  @Field(() => TaskToTaskRelationTypeCreateManyProjectInputEnvelope, { nullable: true })
  @Type(() => TaskToTaskRelationTypeCreateManyProjectInputEnvelope)
  createMany?: TaskToTaskRelationTypeCreateManyProjectInputEnvelope;

  @Field(() => [TaskToTaskRelationTypeWhereUniqueInput], { nullable: true })
  @Type(() => TaskToTaskRelationTypeWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<TaskToTaskRelationTypeWhereUniqueInput, 'id'>>;
}
