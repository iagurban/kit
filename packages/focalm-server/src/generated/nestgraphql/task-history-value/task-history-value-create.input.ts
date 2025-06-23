import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { TaskHistoryKey } from '../prisma/task-history-key.enum';
import { TaskHistoryOperation } from '../prisma/task-history-operation.enum';
import { TaskCreateNestedOneWithoutHistoryValuesInput } from '../task/task-create-nested-one-without-history-values.input';
import { TaskHistoryGroupCreateNestedOneWithoutValuesInput } from '../task-history-group/task-history-group-create-nested-one-without-values.input';

@InputType()
export class TaskHistoryValueCreateInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => TaskHistoryKey, { nullable: false })
  key!: `${TaskHistoryKey}`;

  @Field(() => TaskHistoryOperation, { nullable: true })
  op?: `${TaskHistoryOperation}`;

  @Field(() => GraphQLJSON, { nullable: false })
  value!: any;

  @Field(() => TaskHistoryGroupCreateNestedOneWithoutValuesInput, { nullable: false })
  group!: TaskHistoryGroupCreateNestedOneWithoutValuesInput;

  @Field(() => TaskCreateNestedOneWithoutHistoryValuesInput, { nullable: false })
  task!: TaskCreateNestedOneWithoutHistoryValuesInput;
}
