import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { RefreshTokenUncheckedUpdateManyWithoutUserNestedInput } from '../refresh-token/refresh-token-unchecked-update-many-without-user-nested.input';
import { StoredFileUncheckedUpdateManyWithoutUploadedByUserNestedInput } from '../stored-file/stored-file-unchecked-update-many-without-uploaded-by-user-nested.input';

@InputType()
export class UserUncheckedUpdateWithoutChatEventsInput {
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

  @Field(() => StoredFileUncheckedUpdateManyWithoutUploadedByUserNestedInput, { nullable: true })
  uploadedFiles?: StoredFileUncheckedUpdateManyWithoutUploadedByUserNestedInput;

  @Field(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInput, { nullable: true })
  refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
}
