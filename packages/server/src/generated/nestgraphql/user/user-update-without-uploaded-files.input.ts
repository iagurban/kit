import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { MenuUpdateManyWithoutOwnerNestedInput } from '../menu/menu-update-many-without-owner-nested.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { RefreshTokenUpdateManyWithoutUserNestedInput } from '../refresh-token/refresh-token-update-many-without-user-nested.input';

@InputType()
export class UserUpdateWithoutUploadedFilesInput {
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

  @Field(() => MenuUpdateManyWithoutOwnerNestedInput, { nullable: true })
  @Type(() => MenuUpdateManyWithoutOwnerNestedInput)
  menus?: MenuUpdateManyWithoutOwnerNestedInput;

  @Field(() => RefreshTokenUpdateManyWithoutUserNestedInput, { nullable: true })
  refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput;
}
