import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutUploadedFilesInput } from '../user/user-create-nested-one-without-uploaded-files.input';
import { StoredFileCreateNestedOneWithoutUploadsInput } from '../stored-file/stored-file-create-nested-one-without-uploads.input';
import { MenuCreateNestedOneWithoutFilesInput } from '../menu/menu-create-nested-one-without-files.input';
import { Type } from 'class-transformer';
import { ItemCreateNestedManyWithoutImageInput } from '../item/item-create-nested-many-without-image.input';

@InputType()
export class UploadedFileCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    originalName!: string;

    @Field(() => String, {nullable:false})
    mimetype!: string;

    @Field(() => Date, {nullable:true})
    uploadedAt?: Date | string;

    @Field(() => UserCreateNestedOneWithoutUploadedFilesInput, {nullable:false})
    uploader!: UserCreateNestedOneWithoutUploadedFilesInput;

    @Field(() => StoredFileCreateNestedOneWithoutUploadsInput, {nullable:false})
    storedFile!: StoredFileCreateNestedOneWithoutUploadsInput;

    @Field(() => MenuCreateNestedOneWithoutFilesInput, {nullable:false})
    @Type(() => MenuCreateNestedOneWithoutFilesInput)
    menu!: MenuCreateNestedOneWithoutFilesInput;

    @Field(() => ItemCreateNestedManyWithoutImageInput, {nullable:true})
    @Type(() => ItemCreateNestedManyWithoutImageInput)
    usingItems?: ItemCreateNestedManyWithoutImageInput;
}
