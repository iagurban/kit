import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { TagUncheckedUpdateManyWithoutMenuNestedInput } from '../tag/tag-unchecked-update-many-without-menu-nested.input';
import { UploadedFileUncheckedUpdateManyWithoutMenuNestedInput } from '../uploaded-file/uploaded-file-unchecked-update-many-without-menu-nested.input';
import { Type } from 'class-transformer';

@InputType()
export class MenuUncheckedUpdateWithoutItemsInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    title?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    ownerId?: StringFieldUpdateOperationsInput;

    @Field(() => TagUncheckedUpdateManyWithoutMenuNestedInput, {nullable:true})
    tags?: TagUncheckedUpdateManyWithoutMenuNestedInput;

    @Field(() => UploadedFileUncheckedUpdateManyWithoutMenuNestedInput, {nullable:true})
    @Type(() => UploadedFileUncheckedUpdateManyWithoutMenuNestedInput)
    files?: UploadedFileUncheckedUpdateManyWithoutMenuNestedInput;
}
