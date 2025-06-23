import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationTypeCreateOrConnectWithoutRelationsInput } from './task-to-task-relation-type-create-or-connect-without-relations.input';
import { TaskToTaskRelationTypeCreateWithoutRelationsInput } from './task-to-task-relation-type-create-without-relations.input';
import { TaskToTaskRelationTypeWhereUniqueInput } from './task-to-task-relation-type-where-unique.input';

@InputType()
export class TaskToTaskRelationTypeCreateNestedOneWithoutRelationsInput {
  @Field(() => TaskToTaskRelationTypeCreateWithoutRelationsInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeCreateWithoutRelationsInput)
  create?: TaskToTaskRelationTypeCreateWithoutRelationsInput;

  @Field(() => TaskToTaskRelationTypeCreateOrConnectWithoutRelationsInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeCreateOrConnectWithoutRelationsInput)
  connectOrCreate?: TaskToTaskRelationTypeCreateOrConnectWithoutRelationsInput;

  @Field(() => TaskToTaskRelationTypeWhereUniqueInput, { nullable: true })
  @Type(() => TaskToTaskRelationTypeWhereUniqueInput)
  connect?: Prisma.AtLeast<TaskToTaskRelationTypeWhereUniqueInput, 'id'>;
}
