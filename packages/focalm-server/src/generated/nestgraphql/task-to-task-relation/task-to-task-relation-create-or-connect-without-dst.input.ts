import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationCreateWithoutDstInput } from './task-to-task-relation-create-without-dst.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@InputType()
export class TaskToTaskRelationCreateOrConnectWithoutDstInput {
  @Field(() => TaskToTaskRelationWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>;

  @Field(() => TaskToTaskRelationCreateWithoutDstInput, { nullable: false })
  @Type(() => TaskToTaskRelationCreateWithoutDstInput)
  create!: TaskToTaskRelationCreateWithoutDstInput;
}
