import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { RefreshTokenUncheckedUpdateManyWithoutUserNestedInput } from '../refresh-token/refresh-token-unchecked-update-many-without-user-nested.input';
import { TaskUncheckedUpdateManyWithoutAuthorNestedInput } from '../task/task-unchecked-update-many-without-author-nested.input';
import { TaskUncheckedUpdateManyWithoutResponsibleNestedInput } from '../task/task-unchecked-update-many-without-responsible-nested.input';
import { TaskHistoryGroupUncheckedUpdateManyWithoutAuthorNestedInput } from '../task-history-group/task-history-group-unchecked-update-many-without-author-nested.input';
import { UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput } from '../uploaded-file/uploaded-file-unchecked-update-many-without-uploader-nested.input';

@InputType()
export class UserUncheckedUpdateWithoutParticipatingTasksInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  email?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  passwordHash?: StringFieldUpdateOperationsInput;

  @Field(() => UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput, { nullable: true })
  uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput;

  @Field(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInput, { nullable: true })
  refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;

  @Field(() => TaskUncheckedUpdateManyWithoutResponsibleNestedInput, { nullable: true })
  assignedTasks?: TaskUncheckedUpdateManyWithoutResponsibleNestedInput;

  @Field(() => TaskUncheckedUpdateManyWithoutAuthorNestedInput, { nullable: true })
  authoredTasks?: TaskUncheckedUpdateManyWithoutAuthorNestedInput;

  @Field(() => TaskHistoryGroupUncheckedUpdateManyWithoutAuthorNestedInput, { nullable: true })
  authoredTaskChanges?: TaskHistoryGroupUncheckedUpdateManyWithoutAuthorNestedInput;
}
