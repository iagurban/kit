import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationTypeCreateInput } from './task-to-task-relation-type-create.input';
import { TaskToTaskRelationTypeUpdateInput } from './task-to-task-relation-type-update.input';
import { TaskToTaskRelationTypeWhereUniqueInput } from './task-to-task-relation-type-where-unique.input';

@ArgsType()
export class UpsertOneTaskToTaskRelationTypeArgs {
  @Field(() => TaskToTaskRelationTypeWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationTypeWhereUniqueInput, 'id'>;

  @Field(() => TaskToTaskRelationTypeCreateInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeCreateInput)
  create!: TaskToTaskRelationTypeCreateInput;

  @Field(() => TaskToTaskRelationTypeUpdateInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeUpdateInput)
  update!: TaskToTaskRelationTypeUpdateInput;
}
