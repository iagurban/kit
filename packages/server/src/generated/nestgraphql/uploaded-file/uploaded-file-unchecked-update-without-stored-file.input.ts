import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { ItemUncheckedUpdateManyWithoutImageNestedInput } from '../item/item-unchecked-update-many-without-image-nested.input';
import { Type } from 'class-transformer';

@InputType()
export class UploadedFileUncheckedUpdateWithoutStoredFileInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    originalName?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    mimetype?: StringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    uploadedAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    uploaderId?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    menuId?: StringFieldUpdateOperationsInput;

    @Field(() => ItemUncheckedUpdateManyWithoutImageNestedInput, {nullable:true})
    @Type(() => ItemUncheckedUpdateManyWithoutImageNestedInput)
    usingItems?: ItemUncheckedUpdateManyWithoutImageNestedInput;
}
