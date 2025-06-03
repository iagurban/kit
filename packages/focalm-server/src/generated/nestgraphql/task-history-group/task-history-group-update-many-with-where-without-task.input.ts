import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryGroupScalarWhereInput } from './task-history-group-scalar-where.input';
import { TaskHistoryGroupUpdateManyMutationInput } from './task-history-group-update-many-mutation.input';

@InputType()
export class TaskHistoryGroupUpdateManyWithWhereWithoutTaskInput {
  @Field(() => TaskHistoryGroupScalarWhereInput, { nullable: false })
  @Type(() => TaskHistoryGroupScalarWhereInput)
  where!: TaskHistoryGroupScalarWhereInput;

  @Field(() => TaskHistoryGroupUpdateManyMutationInput, { nullable: false })
  @Type(() => TaskHistoryGroupUpdateManyMutationInput)
  data!: TaskHistoryGroupUpdateManyMutationInput;
}
