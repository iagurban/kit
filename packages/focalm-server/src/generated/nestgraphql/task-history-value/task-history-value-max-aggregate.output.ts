import { Field, ObjectType } from '@nestjs/graphql';

import { TaskHistoryKey } from '../prisma/task-history-key.enum';

@ObjectType()
export class TaskHistoryValueMaxAggregate {
  @Field(() => String, { nullable: true })
  groupId?: string;

  @Field(() => String, { nullable: true })
  taskId?: string;

  @Field(() => TaskHistoryKey, { nullable: true })
  key?: `${TaskHistoryKey}`;
}
