import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { ProjectUpdateOneRequiredWithoutOwnOfNestedInput } from '../project/project-update-one-required-without-own-of-nested.input';
import { RefreshTokenUpdateManyWithoutUserNestedInput } from '../refresh-token/refresh-token-update-many-without-user-nested.input';
import { TaskUpdateManyWithoutAuthorNestedInput } from '../task/task-update-many-without-author-nested.input';
import { TaskUpdateManyWithoutResponsibleNestedInput } from '../task/task-update-many-without-responsible-nested.input';
import { TaskHistoryGroupUpdateManyWithoutAuthorNestedInput } from '../task-history-group/task-history-group-update-many-without-author-nested.input';
import { UploadedFileUpdateManyWithoutUploaderNestedInput } from '../uploaded-file/uploaded-file-update-many-without-uploader-nested.input';
import { UserInProjectUpdateManyWithoutUserNestedInput } from '../user-in-project/user-in-project-update-many-without-user-nested.input';

@InputType()
export class UserUpdateWithoutParticipatingTasksInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  email?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  name?: StringFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  abbrev?: NullableStringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  passwordHash?: StringFieldUpdateOperationsInput;

  @Field(() => UploadedFileUpdateManyWithoutUploaderNestedInput, { nullable: true })
  uploadedFiles?: UploadedFileUpdateManyWithoutUploaderNestedInput;

  @Field(() => RefreshTokenUpdateManyWithoutUserNestedInput, { nullable: true })
  refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput;

  @Field(() => TaskUpdateManyWithoutResponsibleNestedInput, { nullable: true })
  assignedTasks?: TaskUpdateManyWithoutResponsibleNestedInput;

  @Field(() => TaskUpdateManyWithoutAuthorNestedInput, { nullable: true })
  authoredTasks?: TaskUpdateManyWithoutAuthorNestedInput;

  @Field(() => TaskHistoryGroupUpdateManyWithoutAuthorNestedInput, { nullable: true })
  authoredTaskChanges?: TaskHistoryGroupUpdateManyWithoutAuthorNestedInput;

  @Field(() => ProjectUpdateOneRequiredWithoutOwnOfNestedInput, { nullable: true })
  ownProject?: ProjectUpdateOneRequiredWithoutOwnOfNestedInput;

  @Field(() => UserInProjectUpdateManyWithoutUserNestedInput, { nullable: true })
  inProjects?: UserInProjectUpdateManyWithoutUserNestedInput;
}
