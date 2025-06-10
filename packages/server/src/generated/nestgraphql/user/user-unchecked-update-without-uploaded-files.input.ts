import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { MenuUncheckedUpdateManyWithoutOwnerNestedInput } from '../menu/menu-unchecked-update-many-without-owner-nested.input';
import { Type } from 'class-transformer';
import { RefreshTokenUncheckedUpdateManyWithoutUserNestedInput } from '../refresh-token/refresh-token-unchecked-update-many-without-user-nested.input';

@InputType()
export class UserUncheckedUpdateWithoutUploadedFilesInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    passwordHash?: StringFieldUpdateOperationsInput;

    @Field(() => MenuUncheckedUpdateManyWithoutOwnerNestedInput, {nullable:true})
    @Type(() => MenuUncheckedUpdateManyWithoutOwnerNestedInput)
    menus?: MenuUncheckedUpdateManyWithoutOwnerNestedInput;

    @Field(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
}
