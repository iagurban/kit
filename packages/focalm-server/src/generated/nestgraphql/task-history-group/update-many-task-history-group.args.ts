import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryGroupUpdateManyMutationInput } from './task-history-group-update-many-mutation.input';
import { TaskHistoryGroupWhereInput } from './task-history-group-where.input';

@ArgsType()
export class UpdateManyTaskHistoryGroupArgs {
  @Field(() => TaskHistoryGroupUpdateManyMutationInput, { nullable: false })
  @Type(() => TaskHistoryGroupUpdateManyMutationInput)
  data!: TaskHistoryGroupUpdateManyMutationInput;

  @Field(() => TaskHistoryGroupWhereInput, { nullable: true })
  @Type(() => TaskHistoryGroupWhereInput)
  where?: TaskHistoryGroupWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
