import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { TaskHistoryKey } from '../prisma/task-history-key.enum';
import { TaskHistoryOperation } from '../prisma/task-history-operation.enum';
import { TaskHistoryGroupCreateNestedOneWithoutValuesInput } from '../task-history-group/task-history-group-create-nested-one-without-values.input';

@InputType()
export class TaskHistoryValueCreateWithoutTaskInput {
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
}
