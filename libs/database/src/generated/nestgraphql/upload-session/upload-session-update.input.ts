import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { EnumUploadStatusFieldUpdateOperationsInput } from '../prisma/enum-upload-status-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { StoredFileUpdateOneRequiredWithoutUploadSessionNestedInput } from '../stored-file/stored-file-update-one-required-without-upload-session-nested.input';
import { UploadChunkUpdateManyWithoutSessionNestedInput } from '../upload-chunk/upload-chunk-update-many-without-session-nested.input';

@InputType()
export class UploadSessionUpdateInput {
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

  @Field(() => StoredFileUpdateOneRequiredWithoutUploadSessionNestedInput, { nullable: true })
  file?: StoredFileUpdateOneRequiredWithoutUploadSessionNestedInput;

  @Field(() => UploadChunkUpdateManyWithoutSessionNestedInput, { nullable: true })
  chunks?: UploadChunkUpdateManyWithoutSessionNestedInput;
}
