import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemUncheckedUpdateManyWithoutMenuNestedInput } from '../item/item-unchecked-update-many-without-menu-nested.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { TagUncheckedUpdateManyWithoutMenuNestedInput } from '../tag/tag-unchecked-update-many-without-menu-nested.input';
import { UploadedFileUncheckedUpdateManyWithoutMenuNestedInput } from '../uploaded-file/uploaded-file-unchecked-update-many-without-menu-nested.input';

@InputType()
export class MenuUncheckedUpdateWithoutOwnerInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  createdAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  title?: StringFieldUpdateOperationsInput;

  @Field(() => ItemUncheckedUpdateManyWithoutMenuNestedInput, { nullable: true })
  @Type(() => ItemUncheckedUpdateManyWithoutMenuNestedInput)
  items?: ItemUncheckedUpdateManyWithoutMenuNestedInput;

  @Field(() => TagUncheckedUpdateManyWithoutMenuNestedInput, { nullable: true })
  tags?: TagUncheckedUpdateManyWithoutMenuNestedInput;

  @Field(() => UploadedFileUncheckedUpdateManyWithoutMenuNestedInput, { nullable: true })
  @Type(() => UploadedFileUncheckedUpdateManyWithoutMenuNestedInput)
  files?: UploadedFileUncheckedUpdateManyWithoutMenuNestedInput;
}
