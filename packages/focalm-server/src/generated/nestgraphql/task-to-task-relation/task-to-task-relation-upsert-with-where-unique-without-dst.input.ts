import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationCreateWithoutDstInput } from './task-to-task-relation-create-without-dst.input';
import { TaskToTaskRelationUpdateWithoutDstInput } from './task-to-task-relation-update-without-dst.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@InputType()
export class TaskToTaskRelationUpsertWithWhereUniqueWithoutDstInput {
  @Field(() => TaskToTaskRelationWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>;

  @Field(() => TaskToTaskRelationUpdateWithoutDstInput, { nullable: false })
  @Type(() => TaskToTaskRelationUpdateWithoutDstInput)
  update!: TaskToTaskRelationUpdateWithoutDstInput;

  @Field(() => TaskToTaskRelationCreateWithoutDstInput, { nullable: false })
  @Type(() => TaskToTaskRelationCreateWithoutDstInput)
  create!: TaskToTaskRelationCreateWithoutDstInput;
}
