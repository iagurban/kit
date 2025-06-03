import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryGroupWhereInput } from './task-history-group-where.input';

@ArgsType()
export class DeleteManyTaskHistoryGroupArgs {
  @Field(() => TaskHistoryGroupWhereInput, { nullable: true })
  @Type(() => TaskHistoryGroupWhereInput)
  where?: TaskHistoryGroupWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
