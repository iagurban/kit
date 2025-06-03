import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuUncheckedUpdateManyWithoutOwnerNestedInput } from '../menu/menu-unchecked-update-many-without-owner-nested.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput } from '../uploaded-file/uploaded-file-unchecked-update-many-without-uploader-nested.input';

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

  @Field(() => StringFieldUpdateOperationsInput, { nullable: true })
  passwordHash?: StringFieldUpdateOperationsInput;

  @Field(() => MenuUncheckedUpdateManyWithoutOwnerNestedInput, { nullable: true })
  @Type(() => MenuUncheckedUpdateManyWithoutOwnerNestedInput)
  menus?: MenuUncheckedUpdateManyWithoutOwnerNestedInput;

  @Field(() => UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput, { nullable: true })
  @Type(() => UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput)
  uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput;
}
