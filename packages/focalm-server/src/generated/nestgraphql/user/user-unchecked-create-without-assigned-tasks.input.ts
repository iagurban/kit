import { Field, InputType } from '@nestjs/graphql';

import { RefreshTokenUncheckedCreateNestedManyWithoutUserInput } from '../refresh-token/refresh-token-unchecked-create-nested-many-without-user.input';
import { TaskUncheckedCreateNestedManyWithoutAuthorInput } from '../task/task-unchecked-create-nested-many-without-author.input';
import { TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInput } from '../task-history-group/task-history-group-unchecked-create-nested-many-without-author.input';
import { UploadedFileUncheckedCreateNestedManyWithoutUploaderInput } from '../uploaded-file/uploaded-file-unchecked-create-nested-many-without-uploader.input';
import { UserInTaskUncheckedCreateNestedManyWithoutUserInput } from '../user-in-task/user-in-task-unchecked-create-nested-many-without-user.input';

@InputType()
export class UserUncheckedCreateWithoutAssignedTasksInput {
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

  @Field(() => UploadedFileUncheckedCreateNestedManyWithoutUploaderInput, { nullable: true })
  uploadedFiles?: UploadedFileUncheckedCreateNestedManyWithoutUploaderInput;

  @Field(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInput, { nullable: true })
  refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput;

  @Field(() => TaskUncheckedCreateNestedManyWithoutAuthorInput, { nullable: true })
  authoredTasks?: TaskUncheckedCreateNestedManyWithoutAuthorInput;

  @Field(() => TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInput, { nullable: true })
  authoredTaskChanges?: TaskHistoryGroupUncheckedCreateNestedManyWithoutAuthorInput;

  @Field(() => UserInTaskUncheckedCreateNestedManyWithoutUserInput, { nullable: true })
  participatingTasks?: UserInTaskUncheckedCreateNestedManyWithoutUserInput;
}
