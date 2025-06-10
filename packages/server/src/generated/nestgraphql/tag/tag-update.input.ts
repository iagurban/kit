import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { MenuUpdateOneRequiredWithoutTagsNestedInput } from '../menu/menu-update-one-required-without-tags-nested.input';
import { Type } from 'class-transformer';

@InputType()
export class TagUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => MenuUpdateOneRequiredWithoutTagsNestedInput, {nullable:true})
    @Type(() => MenuUpdateOneRequiredWithoutTagsNestedInput)
    menu?: MenuUpdateOneRequiredWithoutTagsNestedInput;
}
