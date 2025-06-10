import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { UserUpdateOneRequiredWithoutMenusNestedInput } from '../user/user-update-one-required-without-menus-nested.input';
import { ItemUpdateManyWithoutMenuNestedInput } from '../item/item-update-many-without-menu-nested.input';
import { Type } from 'class-transformer';
import { TagUpdateManyWithoutMenuNestedInput } from '../tag/tag-update-many-without-menu-nested.input';
import { UploadedFileUpdateManyWithoutMenuNestedInput } from '../uploaded-file/uploaded-file-update-many-without-menu-nested.input';

@InputType()
export class MenuUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    title?: StringFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneRequiredWithoutMenusNestedInput, {nullable:true})
    owner?: UserUpdateOneRequiredWithoutMenusNestedInput;

    @Field(() => ItemUpdateManyWithoutMenuNestedInput, {nullable:true})
    @Type(() => ItemUpdateManyWithoutMenuNestedInput)
    items?: ItemUpdateManyWithoutMenuNestedInput;

    @Field(() => TagUpdateManyWithoutMenuNestedInput, {nullable:true})
    tags?: TagUpdateManyWithoutMenuNestedInput;

    @Field(() => UploadedFileUpdateManyWithoutMenuNestedInput, {nullable:true})
    @Type(() => UploadedFileUpdateManyWithoutMenuNestedInput)
    files?: UploadedFileUpdateManyWithoutMenuNestedInput;
}
