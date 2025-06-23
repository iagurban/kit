import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueUpdateInput } from './task-history-value-update.input';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@ArgsType()
export class UpdateOneTaskHistoryValueArgs {
  @Field(() => TaskHistoryValueUpdateInput, { nullable: false })
  @Type(() => TaskHistoryValueUpdateInput)
  data!: TaskHistoryValueUpdateInput;

  @Field(() => TaskHistoryValueWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'id'>;
}
