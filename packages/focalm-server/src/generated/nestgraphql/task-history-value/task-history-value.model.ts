import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';

import { TaskHistoryKey } from '../prisma/task-history-key.enum';
import { TaskHistoryGroup } from '../task-history-group/task-history-group.model';

@ObjectType()
export class TaskHistoryValue {
  @Field(() => String, { nullable: false })
  groupId!: string;

  @Field(() => String, { nullable: false })
  taskId!: string;

  @Field(() => TaskHistoryKey, { nullable: false })
  key!: `${TaskHistoryKey}`;

  @Field(() => GraphQLJSON, { nullable: false })
  value!: any;

  @Field(() => TaskHistoryGroup, { nullable: false })
  group?: TaskHistoryGroup;
}
