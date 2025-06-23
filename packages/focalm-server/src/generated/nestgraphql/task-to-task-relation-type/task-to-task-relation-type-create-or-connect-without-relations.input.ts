import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationTypeCreateWithoutRelationsInput } from './task-to-task-relation-type-create-without-relations.input';
import { TaskToTaskRelationTypeWhereUniqueInput } from './task-to-task-relation-type-where-unique.input';

@InputType()
export class TaskToTaskRelationTypeCreateOrConnectWithoutRelationsInput {
  @Field(() => TaskToTaskRelationTypeWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationTypeWhereUniqueInput, 'id'>;

  @Field(() => TaskToTaskRelationTypeCreateWithoutRelationsInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeCreateWithoutRelationsInput)
  create!: TaskToTaskRelationTypeCreateWithoutRelationsInput;
}
