import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutMenusInput } from '../user/user-create-nested-one-without-menus.input';
import { TagCreateNestedManyWithoutMenuInput } from '../tag/tag-create-nested-many-without-menu.input';
import { UploadedFileCreateNestedManyWithoutMenuInput } from '../uploaded-file/uploaded-file-create-nested-many-without-menu.input';
import { Type } from 'class-transformer';

@InputType()
export class MenuCreateWithoutItemsInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => String, {nullable:false})
    title!: string;

    @Field(() => UserCreateNestedOneWithoutMenusInput, {nullable:false})
    owner!: UserCreateNestedOneWithoutMenusInput;

    @Field(() => TagCreateNestedManyWithoutMenuInput, {nullable:true})
    tags?: TagCreateNestedManyWithoutMenuInput;

    @Field(() => UploadedFileCreateNestedManyWithoutMenuInput, {nullable:true})
    @Type(() => UploadedFileCreateNestedManyWithoutMenuInput)
    files?: UploadedFileCreateNestedManyWithoutMenuInput;
}
