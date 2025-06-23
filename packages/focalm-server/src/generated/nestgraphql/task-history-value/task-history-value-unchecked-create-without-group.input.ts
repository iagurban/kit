import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { TaskHistoryKey } from '../prisma/task-history-key.enum';
import { TaskHistoryOperation } from '../prisma/task-history-operation.enum';

@InputType()
export class TaskHistoryValueUncheckedCreateWithoutGroupInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: false })
  taskId!: string;

  @Field(() => TaskHistoryKey, { nullable: false })
  key!: `${TaskHistoryKey}`;

  @Field(() => TaskHistoryOperation, { nullable: true })
  op?: `${TaskHistoryOperation}`;

  @Field(() => GraphQLJSON, { nullable: false })
  value!: any;
}
