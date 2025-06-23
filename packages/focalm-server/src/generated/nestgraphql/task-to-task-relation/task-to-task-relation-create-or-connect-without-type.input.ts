import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationCreateWithoutTypeInput } from './task-to-task-relation-create-without-type.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@InputType()
export class TaskToTaskRelationCreateOrConnectWithoutTypeInput {
  @Field(() => TaskToTaskRelationWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>;

  @Field(() => TaskToTaskRelationCreateWithoutTypeInput, { nullable: false })
  @Type(() => TaskToTaskRelationCreateWithoutTypeInput)
  create!: TaskToTaskRelationCreateWithoutTypeInput;
}
