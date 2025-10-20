import { Field, InputType } from '@nestjs/graphql';

import { ChatUpdateManyWithoutOwnerNestedInput } from '../chat/chat-update-many-without-owner-nested.input';
import { ChatEventUpdateManyWithoutAuthorNestedInput } from '../chat-event/chat-event-update-many-without-author-nested.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { RefreshTokenUpdateManyWithoutUserNestedInput } from '../refresh-token/refresh-token-update-many-without-user-nested.input';
import { StoredFileUpdateManyWithoutUploadedByUserNestedInput } from '../stored-file/stored-file-update-many-without-uploaded-by-user-nested.input';
import { UserChatPermissionsUpdateManyWithoutUserNestedInput } from '../user-chat-permissions/user-chat-permissions-update-many-without-user-nested.input';

@InputType()
export class UserUpdateWithoutChatsMmbershipInput {
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

  @Field(() => StoredFileUpdateManyWithoutUploadedByUserNestedInput, { nullable: true })
  uploadedFiles?: StoredFileUpdateManyWithoutUploadedByUserNestedInput;

  @Field(() => ChatEventUpdateManyWithoutAuthorNestedInput, { nullable: true })
  chatEvents?: ChatEventUpdateManyWithoutAuthorNestedInput;

  @Field(() => UserChatPermissionsUpdateManyWithoutUserNestedInput, { nullable: true })
  chatsPermissions?: UserChatPermissionsUpdateManyWithoutUserNestedInput;

  @Field(() => ChatUpdateManyWithoutOwnerNestedInput, { nullable: true })
  ownChats?: ChatUpdateManyWithoutOwnerNestedInput;

  @Field(() => RefreshTokenUpdateManyWithoutUserNestedInput, { nullable: true })
  RefreshToken?: RefreshTokenUpdateManyWithoutUserNestedInput;
}
