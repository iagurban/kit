import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationUpdateInput } from './task-to-task-relation-update.input';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@ArgsType()
export class UpdateOneTaskToTaskRelationArgs {
  @Field(() => TaskToTaskRelationUpdateInput, { nullable: false })
  @Type(() => TaskToTaskRelationUpdateInput)
  data!: TaskToTaskRelationUpdateInput;

  @Field(() => TaskToTaskRelationWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>;
}
