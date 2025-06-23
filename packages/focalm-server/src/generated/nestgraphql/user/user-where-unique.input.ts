import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { ProjectScalarRelationFilter } from '../project/project-scalar-relation-filter.input';
import { RefreshTokenListRelationFilter } from '../refresh-token/refresh-token-list-relation-filter.input';
import { TaskListRelationFilter } from '../task/task-list-relation-filter.input';
import { TaskHistoryGroupListRelationFilter } from '../task-history-group/task-history-group-list-relation-filter.input';
import { UploadedFileListRelationFilter } from '../uploaded-file/uploaded-file-list-relation-filter.input';
import { UserInProjectListRelationFilter } from '../user-in-project/user-in-project-list-relation-filter.input';
import { UserInTaskListRelationFilter } from '../user-in-task/user-in-task-list-relation-filter.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  ownProjectId?: string;

  @Field(() => [UserWhereInput], { nullable: true })
  AND?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  OR?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  NOT?: Array<UserWhereInput>;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => StringNullableFilter, { nullable: true })
  abbrev?: StringNullableFilter;

  @Field(() => StringFilter, { nullable: true })
  passwordHash?: StringFilter;

  @Field(() => UploadedFileListRelationFilter, { nullable: true })
  uploadedFiles?: UploadedFileListRelationFilter;

  @Field(() => RefreshTokenListRelationFilter, { nullable: true })
  refreshTokens?: RefreshTokenListRelationFilter;

  @Field(() => TaskListRelationFilter, { nullable: true })
  assignedTasks?: TaskListRelationFilter;

  @Field(() => TaskListRelationFilter, { nullable: true })
  authoredTasks?: TaskListRelationFilter;

  @Field(() => TaskHistoryGroupListRelationFilter, { nullable: true })
  authoredTaskChanges?: TaskHistoryGroupListRelationFilter;

  @Field(() => UserInTaskListRelationFilter, { nullable: true })
  participatingTasks?: UserInTaskListRelationFilter;

  @Field(() => ProjectScalarRelationFilter, { nullable: true })
  ownProject?: ProjectScalarRelationFilter;

  @Field(() => UserInProjectListRelationFilter, { nullable: true })
  inProjects?: UserInProjectListRelationFilter;
}
