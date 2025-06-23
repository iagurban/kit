import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationUpdateWithoutDstInput } from './task-to-task-relation-update-without-dst.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@InputType()
export class TaskToTaskRelationUpdateWithWhereUniqueWithoutDstInput {
  @Field(() => TaskToTaskRelationWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>;

  @Field(() => TaskToTaskRelationUpdateWithoutDstInput, { nullable: false })
  @Type(() => TaskToTaskRelationUpdateWithoutDstInput)
  data!: TaskToTaskRelationUpdateWithoutDstInput;
}
