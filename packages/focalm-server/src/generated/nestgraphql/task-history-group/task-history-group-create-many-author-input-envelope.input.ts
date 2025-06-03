import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryGroupCreateManyAuthorInput } from './task-history-group-create-many-author.input';

@InputType()
export class TaskHistoryGroupCreateManyAuthorInputEnvelope {
  @Field(() => [TaskHistoryGroupCreateManyAuthorInput], { nullable: false })
  @Type(() => TaskHistoryGroupCreateManyAuthorInput)
  data!: Array<TaskHistoryGroupCreateManyAuthorInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
