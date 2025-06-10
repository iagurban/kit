import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInput } from '../uploaded-file/uploaded-file-unchecked-update-many-without-stored-file-nested.input';
import { Type } from 'class-transformer';

@InputType()
export class StoredFileUncheckedUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    hash?: StringFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    size?: IntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInput, {nullable:true})
    @Type(() => UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInput)
    uploads?: UploadedFileUncheckedUpdateManyWithoutStoredFileNestedInput;
}
