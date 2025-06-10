import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput } from '../uploaded-file/uploaded-file-unchecked-update-many-without-uploader-nested.input';
import { Type } from 'class-transformer';
import { RefreshTokenUncheckedUpdateManyWithoutUserNestedInput } from '../refresh-token/refresh-token-unchecked-update-many-without-user-nested.input';

@InputType()
export class UserUncheckedUpdateWithoutMenusInput {

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

    @Field(() => UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput, {nullable:true})
    @Type(() => UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput)
    uploadedFiles?: UploadedFileUncheckedUpdateManyWithoutUploaderNestedInput;

    @Field(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput;
}
