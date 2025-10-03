import { Field, InputType } from '@nestjs/graphql';

import { ChatEventUncheckedUpdateManyWithoutAuthorNestedInput } from '../chat-event/chat-event-unchecked-update-many-without-author-nested.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { StoredFileUncheckedUpdateManyWithoutUploadedByUserNestedInput } from '../stored-file/stored-file-unchecked-update-many-without-uploaded-by-user-nested.input';

@InputType()
export class UserUncheckedUpdateWithoutRefreshTokensInput {
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

  @Field(() => ChatEventUncheckedUpdateManyWithoutAuthorNestedInput, { nullable: true })
  chatEvents?: ChatEventUncheckedUpdateManyWithoutAuthorNestedInput;
}
