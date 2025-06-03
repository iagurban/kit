import { Field, InputType } from '@nestjs/graphql';

import { TaskCreateNestedManyWithoutAuthorInput } from '../task/task-create-nested-many-without-author.input';
import { TaskCreateNestedManyWithoutResponsibleInput } from '../task/task-create-nested-many-without-responsible.input';
import { TaskHistoryGroupCreateNestedManyWithoutAuthorInput } from '../task-history-group/task-history-group-create-nested-many-without-author.input';
import { UploadedFileCreateNestedManyWithoutUploaderInput } from '../uploaded-file/uploaded-file-create-nested-many-without-uploader.input';

@InputType()
export class UserCreateWithoutRefreshTokensInput {
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

  @Field(() => TaskCreateNestedManyWithoutResponsibleInput, { nullable: true })
  assignedTasks?: TaskCreateNestedManyWithoutResponsibleInput;

  @Field(() => TaskCreateNestedManyWithoutAuthorInput, { nullable: true })
  authoredTasks?: TaskCreateNestedManyWithoutAuthorInput;

  @Field(() => TaskHistoryGroupCreateNestedManyWithoutAuthorInput, { nullable: true })
  authoredTaskChanges?: TaskHistoryGroupCreateNestedManyWithoutAuthorInput;
}
