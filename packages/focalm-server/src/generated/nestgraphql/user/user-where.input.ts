import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { RefreshTokenListRelationFilter } from '../refresh-token/refresh-token-list-relation-filter.input';
import { TaskListRelationFilter } from '../task/task-list-relation-filter.input';
import { TaskHistoryGroupListRelationFilter } from '../task-history-group/task-history-group-list-relation-filter.input';
import { UploadedFileListRelationFilter } from '../uploaded-file/uploaded-file-list-relation-filter.input';

@InputType()
export class UserWhereInput {
  @Field(() => [UserWhereInput], { nullable: true })
  AND?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  OR?: Array<UserWhereInput>;

  @Field(() => [UserWhereInput], { nullable: true })
  NOT?: Array<UserWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => StringFilter, { nullable: true })
  email?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

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
}
