import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationUpdateWithoutTypeInput } from './task-to-task-relation-update-without-type.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@InputType()
export class TaskToTaskRelationUpdateWithWhereUniqueWithoutTypeInput {
  @Field(() => TaskToTaskRelationWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>;

  @Field(() => TaskToTaskRelationUpdateWithoutTypeInput, { nullable: false })
  @Type(() => TaskToTaskRelationUpdateWithoutTypeInput)
  data!: TaskToTaskRelationUpdateWithoutTypeInput;
}
