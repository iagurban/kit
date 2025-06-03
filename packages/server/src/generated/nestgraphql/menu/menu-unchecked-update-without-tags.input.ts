import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemUncheckedUpdateManyWithoutMenuNestedInput } from '../item/item-unchecked-update-many-without-menu-nested.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UploadedFileUncheckedUpdateManyWithoutMenuNestedInput } from '../uploaded-file/uploaded-file-unchecked-update-many-without-menu-nested.input';

@InputType()
export class MenuUncheckedUpdateWithoutTagsInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  title?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  ownerId?: StringFieldUpdateOperationsInput;

  @Field(() => ItemUncheckedUpdateManyWithoutMenuNestedInput, { nullable: true })
  @Type(() => ItemUncheckedUpdateManyWithoutMenuNestedInput)
  items?: ItemUncheckedUpdateManyWithoutMenuNestedInput;

  @Field(() => UploadedFileUncheckedUpdateManyWithoutMenuNestedInput, { nullable: true })
  @Type(() => UploadedFileUncheckedUpdateManyWithoutMenuNestedInput)
  files?: UploadedFileUncheckedUpdateManyWithoutMenuNestedInput;
}
