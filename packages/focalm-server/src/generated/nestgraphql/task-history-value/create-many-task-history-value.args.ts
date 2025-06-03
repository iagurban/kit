import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryValueCreateManyInput } from './task-history-value-create-many.input';

@ArgsType()
export class CreateManyTaskHistoryValueArgs {
  @Field(() => [TaskHistoryValueCreateManyInput], { nullable: false })
  @Type(() => TaskHistoryValueCreateManyInput)
  data!: Array<TaskHistoryValueCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
