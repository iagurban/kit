import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationWhereUniqueInput } from './task-to-task-relation-where-unique.input';

@ArgsType()
export class FindUniqueTaskToTaskRelationOrThrowArgs {
  @Field(() => TaskToTaskRelationWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationWhereUniqueInput, 'srcId_dstId_typeId'>;
}
