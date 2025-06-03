import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UploadedFileUpdateManyWithoutStoredFileNestedInput } from '../uploaded-file/uploaded-file-update-many-without-stored-file-nested.input';

@InputType()
export class StoredFileUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  hash?: StringFieldUpdateOperationsInput;

  @Field(() => IntFieldUpdateOperationsInput, { nullable: true })
  size?: IntFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => UploadedFileUpdateManyWithoutStoredFileNestedInput, { nullable: true })
  @Type(() => UploadedFileUpdateManyWithoutStoredFileNestedInput)
  uploads?: UploadedFileUpdateManyWithoutStoredFileNestedInput;
}
