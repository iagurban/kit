import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Project } from '../project/project.model';
import { RefreshToken } from '../refresh-token/refresh-token.model';
import { Task } from '../task/task.model';
import { TaskHistoryGroup } from '../task-history-group/task-history-group.model';
import { UploadedFile } from '../uploaded-file/uploaded-file.model';
import { UserInProject } from '../user-in-project/user-in-project.model';
import { UserInTask } from '../user-in-task/user-in-task.model';
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

  @Field(() => String, { nullable: true })
  abbrev!: string | null;

  @Field(() => String, { nullable: false })
  passwordHash!: string;

  @Field(() => String, { nullable: false })
  ownProjectId!: string;

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

  @Field(() => [UserInTask], { nullable: true })
  participatingTasks?: Array<UserInTask>;

  @Field(() => Project, { nullable: false })
  ownProject?: Project;

  @Field(() => [UserInProject], { nullable: true })
  inProjects?: Array<UserInProject>;

  @Field(() => UserCount, { nullable: false })
  _count?: UserCount;
}
