import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryGroupCreateInput } from './task-history-group-create.input';
import { TaskHistoryGroupUpdateInput } from './task-history-group-update.input';
import { TaskHistoryGroupWhereUniqueInput } from './task-history-group-where-unique.input';

@ArgsType()
export class UpsertOneTaskHistoryGroupArgs {
  @Field(() => TaskHistoryGroupWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryGroupWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryGroupWhereUniqueInput, 'id'>;

  @Field(() => TaskHistoryGroupCreateInput, { nullable: false })
  @Type(() => TaskHistoryGroupCreateInput)
  create!: TaskHistoryGroupCreateInput;

  @Field(() => TaskHistoryGroupUpdateInput, { nullable: false })
  @Type(() => TaskHistoryGroupUpdateInput)
  update!: TaskHistoryGroupUpdateInput;
}
