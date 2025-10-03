import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { EnumUploadStatusFieldUpdateOperationsInput } from '../prisma/enum-upload-status-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UploadChunkUncheckedUpdateManyWithoutSessionNestedInput } from '../upload-chunk/upload-chunk-unchecked-update-many-without-session-nested.input';

@InputType()
export class UploadSessionUncheckedUpdateWithoutFileInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  storageUploadId?: StringFieldUpdateOperationsInput;

  @Field(() => IntFieldUpdateOperationsInput, { nullable: true })
  totalChunks?: IntFieldUpdateOperationsInput;

  @Field(() => EnumUploadStatusFieldUpdateOperationsInput, { nullable: true })
  status?: EnumUploadStatusFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  failReason?: NullableStringFieldUpdateOperationsInput;

  @Field(() => IntFieldUpdateOperationsInput, { nullable: true })
  totalFailureCount?: IntFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => UploadChunkUncheckedUpdateManyWithoutSessionNestedInput, { nullable: true })
  chunks?: UploadChunkUncheckedUpdateManyWithoutSessionNestedInput;
}
