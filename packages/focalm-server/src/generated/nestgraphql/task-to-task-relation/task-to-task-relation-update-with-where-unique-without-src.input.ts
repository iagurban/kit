import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationUpdateWithoutSrcInput } from './task-to-task-relation-update-without-src.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@InputType()
export class TaskToTaskRelationUpdateWithWhereUniqueWithoutSrcInput {
  @Field(() => TaskToTaskRelationWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>;

  @Field(() => TaskToTaskRelationUpdateWithoutSrcInput, { nullable: false })
  @Type(() => TaskToTaskRelationUpdateWithoutSrcInput)
  data!: TaskToTaskRelationUpdateWithoutSrcInput;
}
