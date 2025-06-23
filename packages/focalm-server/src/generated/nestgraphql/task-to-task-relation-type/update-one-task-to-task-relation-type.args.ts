import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskToTaskRelationTypeUpdateInput } from './task-to-task-relation-type-update.input';
import { TaskToTaskRelationTypeWhereUniqueInput } from './task-to-task-relation-type-where-unique.input';

@ArgsType()
export class UpdateOneTaskToTaskRelationTypeArgs {
  @Field(() => TaskToTaskRelationTypeUpdateInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeUpdateInput)
  data!: TaskToTaskRelationTypeUpdateInput;

  @Field(() => TaskToTaskRelationTypeWhereUniqueInput, { nullable: false })
  @Type(() => TaskToTaskRelationTypeWhereUniqueInput)
  where!: Prisma.AtLeast<TaskToTaskRelationTypeWhereUniqueInput, 'id'>;
}
