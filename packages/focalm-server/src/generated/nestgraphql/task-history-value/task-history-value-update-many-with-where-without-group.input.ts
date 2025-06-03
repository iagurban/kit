import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { TaskHistoryValueScalarWhereInput } from './task-history-value-scalar-where.input';
import { TaskHistoryValueUpdateManyMutationInput } from './task-history-value-update-many-mutation.input';

@InputType()
export class TaskHistoryValueUpdateManyWithWhereWithoutGroupInput {
  @Field(() => TaskHistoryValueScalarWhereInput, { nullable: false })
  @Type(() => TaskHistoryValueScalarWhereInput)
  where!: TaskHistoryValueScalarWhereInput;

  @Field(() => TaskHistoryValueUpdateManyMutationInput, { nullable: false })
  @Type(() => TaskHistoryValueUpdateManyMutationInput)
  data!: TaskHistoryValueUpdateManyMutationInput;
}
