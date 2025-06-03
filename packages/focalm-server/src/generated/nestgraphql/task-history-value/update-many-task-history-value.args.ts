import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryValueUpdateManyMutationInput } from './task-history-value-update-many-mutation.input';
import { TaskHistoryValueWhereInput } from './task-history-value-where.input';

@ArgsType()
export class UpdateManyTaskHistoryValueArgs {
  @Field(() => TaskHistoryValueUpdateManyMutationInput, { nullable: false })
  @Type(() => TaskHistoryValueUpdateManyMutationInput)
  data!: TaskHistoryValueUpdateManyMutationInput;

  @Field(() => TaskHistoryValueWhereInput, { nullable: true })
  @Type(() => TaskHistoryValueWhereInput)
  where?: TaskHistoryValueWhereInput;

  @Field(() => Int, { nullable: true })
  limit?: number;
}
