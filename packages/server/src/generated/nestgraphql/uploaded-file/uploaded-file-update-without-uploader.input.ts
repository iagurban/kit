import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { ItemUpdateManyWithoutImageNestedInput } from '../item/item-update-many-without-image-nested.input';
import { MenuUpdateOneRequiredWithoutFilesNestedInput } from '../menu/menu-update-one-required-without-files-nested.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { StoredFileUpdateOneRequiredWithoutUploadsNestedInput } from '../stored-file/stored-file-update-one-required-without-uploads-nested.input';

@InputType()
export class UploadedFileUpdateWithoutUploaderInput {
  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  id?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  originalName?: StringFieldUpdateOperationsInput;

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  mimetype?: StringFieldUpdateOperationsInput;

  @Field(() => DateTimeFieldUpdateOperationsInput, { nullable: true })
  uploadedAt?: DateTimeFieldUpdateOperationsInput;

  @Field(() => StoredFileUpdateOneRequiredWithoutUploadsNestedInput, { nullable: true })
  storedFile?: StoredFileUpdateOneRequiredWithoutUploadsNestedInput;

  @Field(() => MenuUpdateOneRequiredWithoutFilesNestedInput, { nullable: true })
  @Type(() => MenuUpdateOneRequiredWithoutFilesNestedInput)
  menu?: MenuUpdateOneRequiredWithoutFilesNestedInput;

  @Field(() => ItemUpdateManyWithoutImageNestedInput, { nullable: true })
  @Type(() => ItemUpdateManyWithoutImageNestedInput)
  usingItems?: ItemUpdateManyWithoutImageNestedInput;
}
