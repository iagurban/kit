import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationCreateWithoutSrcInput } from './task-to-task-relation-create-without-src.input';
import { TaskToTaskRelationUpdateWithoutSrcInput } from './task-to-task-relation-update-without-src.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@InputType()
export class TaskToTaskRelationUpsertWithWhereUniqueWithoutSrcInput {
  @Field(() => TaskToTaskRelationWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>;

  @Field(() => TaskToTaskRelationUpdateWithoutSrcInput, { nullable: false })
  @Type(() => TaskToTaskRelationUpdateWithoutSrcInput)
  update!: TaskToTaskRelationUpdateWithoutSrcInput;

  @Field(() => TaskToTaskRelationCreateWithoutSrcInput, { nullable: false })
  @Type(() => TaskToTaskRelationCreateWithoutSrcInput)
  create!: TaskToTaskRelationCreateWithoutSrcInput;
}
