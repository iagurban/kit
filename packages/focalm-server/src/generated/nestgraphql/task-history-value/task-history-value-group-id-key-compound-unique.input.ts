import { Field, InputType } from '@nestjs/graphql';

import { TaskHistoryKey } from '../prisma/task-history-key.enum';

@InputType()
export class TaskHistoryValueGroupIdKeyCompoundUniqueInput {
  @Field(() => String, { nullable: false })
  groupId!: string;

  @Field(() => TaskHistoryKey, { nullable: false })
  key!: `${TaskHistoryKey}`;
}
