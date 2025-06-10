import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { UploadedFileUpdateManyWithoutUploaderNestedInput } from '../uploaded-file/uploaded-file-update-many-without-uploader-nested.input';
import { Type } from 'class-transformer';
import { RefreshTokenUpdateManyWithoutUserNestedInput } from '../refresh-token/refresh-token-update-many-without-user-nested.input';

@InputType()
export class UserUpdateWithoutMenusInput {

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

    @Field(() => UploadedFileUpdateManyWithoutUploaderNestedInput, {nullable:true})
    @Type(() => UploadedFileUpdateManyWithoutUploaderNestedInput)
    uploadedFiles?: UploadedFileUpdateManyWithoutUploaderNestedInput;

    @Field(() => RefreshTokenUpdateManyWithoutUserNestedInput, {nullable:true})
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput;
}
