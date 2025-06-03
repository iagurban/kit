import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryValueCreateInput } from './task-history-value-create.input';

@ArgsType()
export class CreateOneTaskHistoryValueArgs {
  @Field(() => TaskHistoryValueCreateInput, { nullable: false })
  @Type(() => TaskHistoryValueCreateInput)
  data!: TaskHistoryValueCreateInput;
}
