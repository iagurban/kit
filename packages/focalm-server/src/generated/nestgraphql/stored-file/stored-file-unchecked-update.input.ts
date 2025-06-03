import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInput } from '../uploaded-file/uploaded-file-unchecked-update-many-without-stored-file-nested.input';

@InputType()
export class StoredFileUncheckedUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  hash?: StringFieldUpdateOperationsInput;

  @Field(() => IntFieldUpdateOperationsInput, { nullable: true })
  size?: IntFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInput, { nullable: true })
  uploads?: UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInput;
}
