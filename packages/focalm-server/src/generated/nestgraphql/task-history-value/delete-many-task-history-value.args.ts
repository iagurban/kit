import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryValueWhereInput } from './task-history-value-where.input';

@ArgsType()
export class DeleteManyTaskHistoryValueArgs {
  @Field(() => TaskHistoryValueWhereInput, { nullable: true })
  @Type(() => TaskHistoryValueWhereInput)
  where?: TaskHistoryValueWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
