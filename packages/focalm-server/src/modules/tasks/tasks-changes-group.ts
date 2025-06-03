import { Field, InputType } from '@nestjs/graphql';

import { CreatedAtFixReason } from '../../generated/nestgraphql/prisma/created-at-fix-reason.enum';
import { TaskHistoryKey } from '../../generated/nestgraphql/prisma/task-history-key.enum';

@InputType()
class TaskFieldUpdateInput {
  @Field(() => TaskHistoryKey)
  field!: TaskHistoryKey;

  @Field(() => String)
  stringValue!: string;
}

@InputType()
export class TasksChangesGroup {
  @Field(() => String)
  id!: string;

  @Field(() => Date)
  localCreatedAt!: Date;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => CreatedAtFixReason, { nullable: true })
  createdAtFixReason?: CreatedAtFixReason;

  @Field(() => [TaskFieldUpdateInput])
  updates!: TaskFieldUpdateInput[];
}
