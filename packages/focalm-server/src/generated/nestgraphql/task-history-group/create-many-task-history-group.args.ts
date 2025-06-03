import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryGroupCreateManyInput } from './task-history-group-create-many.input';

@ArgsType()
export class CreateManyTaskHistoryGroupArgs {
  @Field(() => [TaskHistoryGroupCreateManyInput], { nullable: false })
  @Type(() => TaskHistoryGroupCreateManyInput)
  data!: Array<TaskHistoryGroupCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
