import { Field, ID, ObjectType } from '@nestjs/graphql';

import { CreatedAtFixReason } from '../prisma/created-at-fix-reason.enum';
import { Task } from '../task/task.model';
import { TaskHistoryValue } from '../task-history-value/task-history-value.model';
import { User } from '../user/user.model';
import { TaskHistoryGroupCount } from './task-history-group-count.output';

@ObjectType()
export class TaskHistoryGroup {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  taskId!: string;

  @Field(() => String, { nullable: false })
  authorId!: string;

  @Field(() => Date, { nullable: false })
  localCreatedAt!: Date;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => CreatedAtFixReason, { nullable: true })
  createdAtFixReason!: `${CreatedAtFixReason}` | null;

  @Field(() => Task, { nullable: false })
  task?: Task;

  @Field(() => [TaskHistoryValue], { nullable: true })
  values?: Array<TaskHistoryValue>;

  @Field(() => User, { nullable: false })
  author?: User;

  @Field(() => TaskHistoryGroupCount, { nullable: false })
  _count?: TaskHistoryGroupCount;
}
