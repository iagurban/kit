import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { TaskHistoryKey } from '../prisma/task-history-key.enum';
import { TaskHistoryGroupCreateNestedOneWithoutValuesInput } from '../task-history-group/task-history-group-create-nested-one-without-values.input';

@InputType()
export class TaskHistoryValueCreateInput {
  @Field(() => String, { nullable: false })
  taskId!: string;

  @Field(() => TaskHistoryKey, { nullable: false })
  key!: `${TaskHistoryKey}`;

  @Field(() => GraphQLJSON, { nullable: false })
  value!: any;

  @Field(() => TaskHistoryGroupCreateNestedOneWithoutValuesInput, { nullable: false })
  group!: TaskHistoryGroupCreateNestedOneWithoutValuesInput;
}
