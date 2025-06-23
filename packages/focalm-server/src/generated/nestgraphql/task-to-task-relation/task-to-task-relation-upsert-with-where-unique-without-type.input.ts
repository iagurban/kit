import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationCreateWithoutTypeInput } from './task-to-task-relation-create-without-type.input';
import { TaskToTaskRelationUpdateWithoutTypeInput } from './task-to-task-relation-update-without-type.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@InputType()
export class TaskToTaskRelationUpsertWithWhereUniqueWithoutTypeInput {
  @Field(() => TaskToTaskRelationWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>;

  @Field(() => TaskToTaskRelationUpdateWithoutTypeInput, { nullable: false })
  @Type(() => TaskToTaskRelationUpdateWithoutTypeInput)
  update!: TaskToTaskRelationUpdateWithoutTypeInput;

  @Field(() => TaskToTaskRelationCreateWithoutTypeInput, { nullable: false })
  @Type(() => TaskToTaskRelationCreateWithoutTypeInput)
  create!: TaskToTaskRelationCreateWithoutTypeInput;
}
