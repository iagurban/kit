import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryGroupCreateInput } from './task-history-group-create.input';

@ArgsType()
export class CreateOneTaskHistoryGroupArgs {
  @Field(() => TaskHistoryGroupCreateInput, { nullable: false })
  @Type(() => TaskHistoryGroupCreateInput)
  data!: TaskHistoryGroupCreateInput;
}
