import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemCreateNestedManyWithoutMenuInput } from '../item/item-create-nested-many-without-menu.input';
import { Type } from 'class-transformer';
import { TagCreateNestedManyWithoutMenuInput } from '../tag/tag-create-nested-many-without-menu.input';
import { UploadedFileCreateNestedManyWithoutMenuInput } from '../uploaded-file/uploaded-file-create-nested-many-without-menu.input';

@InputType()
export class MenuCreateWithoutOwnerInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => ItemCreateNestedManyWithoutMenuInput, {nullable:true})
    @Type(() => ItemCreateNestedManyWithoutMenuInput)
    items?: ItemCreateNestedManyWithoutMenuInput;

    @Field(() => TagCreateNestedManyWithoutMenuInput, {nullable:true})
    tags?: TagCreateNestedManyWithoutMenuInput;

    @Field(() => UploadedFileCreateNestedManyWithoutMenuInput, {nullable:true})
    @Type(() => UploadedFileCreateNestedManyWithoutMenuInput)
    files?: UploadedFileCreateNestedManyWithoutMenuInput;
}
