import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { TaskHistoryValueWhereUniqueInput } from './task-history-value-where-unique.input';

@ArgsType()
export class DeleteOneTaskHistoryValueArgs {
  @Field(() => TaskHistoryValueWhereUniqueInput, { nullable: false })
  @Type(() => TaskHistoryValueWhereUniqueInput)
  where!: Prisma.AtLeast<TaskHistoryValueWhereUniqueInput, 'id'>;
}
