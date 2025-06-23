import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { TaskHistoryKey } from '../prisma/task-history-key.enum';
import { TaskHistoryOperation } from '../prisma/task-history-operation.enum';
import { Task } from '../task/task.model';
import { TaskHistoryGroup } from '../task-history-group/task-history-group.model';

@ObjectType()
export class TaskHistoryValue {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  groupId!: string;

  @Field(() => String, { nullable: false })
  taskId!: string;

  @Field(() => TaskHistoryKey, { nullable: false })
  key!: `${TaskHistoryKey}`;

  @Field(() => TaskHistoryOperation, { defaultValue: 'Set', nullable: false })
  op!: `${TaskHistoryOperation}`;

  @Field(() => GraphQLJSON, { nullable: false })
  value!: any;

  @Field(() => TaskHistoryGroup, { nullable: false })
  group?: TaskHistoryGroup;

  @Field(() => Task, { nullable: false })
  task?: Task;
}
