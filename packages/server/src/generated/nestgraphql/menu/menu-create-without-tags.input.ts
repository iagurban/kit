import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutMenusInput } from '../user/user-create-nested-one-without-menus.input';
import { ItemCreateNestedManyWithoutMenuInput } from '../item/item-create-nested-many-without-menu.input';
import { Type } from 'class-transformer';
import { UploadedFileCreateNestedManyWithoutMenuInput } from '../uploaded-file/uploaded-file-create-nested-many-without-menu.input';

@InputType()
export class MenuCreateWithoutTagsInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => UserCreateNestedOneWithoutMenusInput, {nullable:false})
    owner!: UserCreateNestedOneWithoutMenusInput;

    @Field(() => ItemCreateNestedManyWithoutMenuInput, {nullable:true})
    @Type(() => ItemCreateNestedManyWithoutMenuInput)
    items?: ItemCreateNestedManyWithoutMenuInput;

    @Field(() => UploadedFileCreateNestedManyWithoutMenuInput, {nullable:true})
    @Type(() => UploadedFileCreateNestedManyWithoutMenuInput)
    files?: UploadedFileCreateNestedManyWithoutMenuInput;
}
