import { Field, InputType } from '@nestjs/graphql';

import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { NullableDateTimeFieldUpdateOperationsInput } from '../prisma/nullable-date-time-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UploadSessionUpdateOneRequiredWithoutChunksNestedInput } from '../upload-session/upload-session-update-one-required-without-chunks-nested.input';

@InputType()
export class UploadChunkUpdateInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => IntFieldUpdateOperationsInput, { nullable: true })
  partNumber?: IntFieldUpdateOperationsInput;

  @Field(() => NullableStringFieldUpdateOperationsInput, { nullable: true })
  eTag?: NullableStringFieldUpdateOperationsInput;

  @Field(() => NullableDateTimeFieldUpdateOperationsInput, { nullable: true })
  leasedAt?: NullableDateTimeFieldUpdateOperationsInput;

  @Field(() => UploadSessionUpdateOneRequiredWithoutChunksNestedInput, { nullable: true })
  session?: UploadSessionUpdateOneRequiredWithoutChunksNestedInput;
}
