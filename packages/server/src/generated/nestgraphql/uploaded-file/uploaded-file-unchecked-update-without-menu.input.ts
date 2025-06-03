import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemUncheckedUpdateManyWithoutImageNestedInput } from '../item/item-unchecked-update-many-without-image-nested.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';

@InputType()
export class UploadedFileUncheckedUpdateWithoutMenuInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  originalName?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  mimetype?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  uploadedAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  uploaderId?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  storedFileId?: StringFieldUpdateOperationsInput;

  @Field(() => ItemUncheckedUpdateManyWithoutImageNestedInput, { nullable: true })
  @Type(() => ItemUncheckedUpdateManyWithoutImageNestedInput)
  usingItems?: ItemUncheckedUpdateManyWithoutImageNestedInput;
}
