import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemUncheckedCreateNestedManyWithoutMenuInput } from '../item/item-unchecked-create-nested-many-without-menu.input';
import { Type } from 'class-transformer';
import { TagUncheckedCreateNestedManyWithoutMenuInput } from '../tag/tag-unchecked-create-nested-many-without-menu.input';
import { UploadedFileUncheckedCreateNestedManyWithoutMenuInput } from '../uploaded-file/uploaded-file-unchecked-create-nested-many-without-menu.input';

@InputType()
export class MenuUncheckedCreateWithoutOwnerInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => ItemUncheckedCreateNestedManyWithoutMenuInput, {nullable:true})
    @Type(() => ItemUncheckedCreateNestedManyWithoutMenuInput)
    items?: ItemUncheckedCreateNestedManyWithoutMenuInput;

    @Field(() => TagUncheckedCreateNestedManyWithoutMenuInput, {nullable:true})
    tags?: TagUncheckedCreateNestedManyWithoutMenuInput;

    @Field(() => UploadedFileUncheckedCreateNestedManyWithoutMenuInput, {nullable:true})
    @Type(() => UploadedFileUncheckedCreateNestedManyWithoutMenuInput)
    files?: UploadedFileUncheckedCreateNestedManyWithoutMenuInput;
}
