import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueCreateInput } from './task-history-value-create.input';
import { TaskHistoryValueUpdateInput } from './task-history-value-update.input';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@ArgsType()
export class UpsertOneTaskHistoryValueArgs {
  @Field(() => TaskHistoryValueWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'groupId_key'>;

  @Field(() => TaskHistoryValueCreateInput, { nullable: false })
  @Type(() => TaskHistoryValueCreateInput)
  create!: TaskHistoryValueCreateInput;

  @Field(() => TaskHistoryValueUpdateInput, { nullable: false })
  @Type(() => TaskHistoryValueUpdateInput)
  update!: TaskHistoryValueUpdateInput;
}
