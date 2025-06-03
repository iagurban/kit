import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TaskUpdateManyWithoutAuthorNestedInput } from '../task/task-update-many-without-author-nested.input';
import { TaskUpdateManyWithoutResponsibleNestedInput } from '../task/task-update-many-without-responsible-nested.input';
import { TaskHistoryGroupUpdateManyWithoutAuthorNestedInput } from '../task-history-group/task-history-group-update-many-without-author-nested.input';
import { UploadedFileUpdateManyWithoutUploaderNestedInput } from '../uploaded-file/uploaded-file-update-many-without-uploader-nested.input';

@InputType()
export class UserUpdateWithoutRefreshTokensInput {
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

  @Field(() => UploadedFileUpdateManyWithoutUploaderNestedInput, { nullable: true })
  uploadedFiles?: UploadedFileUpdateManyWithoutUploaderNestedInput;

  @Field(() => TaskUpdateManyWithoutResponsibleNestedInput, { nullable: true })
  assignedTasks?: TaskUpdateManyWithoutResponsibleNestedInput;

  @Field(() => TaskUpdateManyWithoutAuthorNestedInput, { nullable: true })
  authoredTasks?: TaskUpdateManyWithoutAuthorNestedInput;

  @Field(() => TaskHistoryGroupUpdateManyWithoutAuthorNestedInput, { nullable: true })
  authoredTaskChanges?: TaskHistoryGroupUpdateManyWithoutAuthorNestedInput;
}
