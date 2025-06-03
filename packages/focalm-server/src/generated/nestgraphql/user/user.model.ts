import { Field, ID, ObjectType } from '@nestjs/graphql';

import { RefreshToken } from '../refresh-token/refresh-token.model';
import { Task } from '../task/task.model';
import { TaskHistoryGroup } from '../task-history-group/task-history-group.model';
import { UploadedFile } from '../uploaded-file/uploaded-file.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {
  @Field(() => ID, { nullable: false })
  id!: string;

  @Field(() => Date, { nullable: false })
  createdAt!: Date;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  passwordHash!: string;

  @Field(() => [UploadedFile], { nullable: true })
  uploadedFiles?: Array<UploadedFile>;

  @Field(() => [RefreshToken], { nullable: true })
  refreshTokens?: Array<RefreshToken>;

  @Field(() => [Task], { nullable: true })
  assignedTasks?: Array<Task>;

  @Field(() => [Task], { nullable: true })
  authoredTasks?: Array<Task>;

  @Field(() => [TaskHistoryGroup], { nullable: true })
  authoredTaskChanges?: Array<TaskHistoryGroup>;

  @Field(() => UserCount, { nullable: false })
  _count?: UserCount;
}
