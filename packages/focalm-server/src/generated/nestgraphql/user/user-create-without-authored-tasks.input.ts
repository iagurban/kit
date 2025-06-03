import { Field, InputType } from '@nestjs/graphql';

import { RefreshTokenCreateNestedManyWithoutUserInput } from '../refresh-token/refresh-token-create-nested-many-without-user.input';
import { TaskCreateNestedManyWithoutResponsibleInput } from '../task/task-create-nested-many-without-responsible.input';
import { TaskHistoryGroupCreateNestedManyWithoutAuthorInput } from '../task-history-group/task-history-group-create-nested-many-without-author.input';
import { UploadedFileCreateNestedManyWithoutUploaderInput } from '../uploaded-file/uploaded-file-create-nested-many-without-uploader.input';

@InputType()
export class UserCreateWithoutAuthoredTasksInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  passwordHash!: string;

  @Field(() => UploadedFileCreateNestedManyWithoutUploaderInput, { nullable: true })
  uploadedFiles?: UploadedFileCreateNestedManyWithoutUploaderInput;

  @Field(() => RefreshTokenCreateNestedManyWithoutUserInput, { nullable: true })
  refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput;

  @Field(() => TaskCreateNestedManyWithoutResponsibleInput, { nullable: true })
  assignedTasks?: TaskCreateNestedManyWithoutResponsibleInput;

  @Field(() => TaskHistoryGroupCreateNestedManyWithoutAuthorInput, { nullable: true })
  authoredTaskChanges?: TaskHistoryGroupCreateNestedManyWithoutAuthorInput;
}
