import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationCreateInput } from './task-to-task-relation-create.input';
import { TaskToTaskRelationUpdateInput } from './task-to-task-relation-update.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@ArgsType()
export class UpsertOneTaskToTaskRelationArgs {
  @Field(() => TaskToTaskRelationWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>;

  @Field(() => TaskToTaskRelationCreateInput, { nullable: false })
  @Type(() => TaskToTaskRelationCreateInput)
  create!: TaskToTaskRelationCreateInput;

  @Field(() => TaskToTaskRelationUpdateInput, { nullable: false })
  @Type(() => TaskToTaskRelationUpdateInput)
  update!: TaskToTaskRelationUpdateInput;
}
