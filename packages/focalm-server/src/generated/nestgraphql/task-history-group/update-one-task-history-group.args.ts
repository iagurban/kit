import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupUpdateInput } from './task-history-group-update.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@ArgsType()
export class UpdateOneTaskHistoryGroupArgs {
  @Field(() => TaskHistoryGroupUpdateInput, { nullable: false })
  @Type(() => TaskHistoryGroupUpdateInput)
  data!: TaskHistoryGroupUpdateInput;

  @Field(() => TaskHistoryGroupWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>;
}
