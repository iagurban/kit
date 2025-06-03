import { Field, InputType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { TaskHistoryKey } from '../prisma/task-history-key.enum';

@InputType()
export class TaskHistoryValueUncheckedCreateWithoutGroupInput {
  @Field(() => String, { nullable: false })
  taskId!: string;

  @Field(() => TaskHistoryKey, { nullable: false })
  key!: `${TaskHistoryKey}`;

  @Field(() => GraphQLJSON, { nullable: false })
  value!: any;
}
