import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuCreateNestedManyWithoutOwnerInput } from '../menu/menu-create-nested-many-without-owner.input';
import { Type } from 'class-transformer';
import { UploadedFileCreateNestedManyWithoutUploaderInput } from '../uploaded-file/uploaded-file-create-nested-many-without-uploader.input';

@InputType()
export class UserCreateWithoutRefreshTokensInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:false})
    passwordHash!: string;

    @Field(() => MenuCreateNestedManyWithoutOwnerInput, {nullable:true})
    @Type(() => MenuCreateNestedManyWithoutOwnerInput)
    menus?: MenuCreateNestedManyWithoutOwnerInput;

    @Field(() => UploadedFileCreateNestedManyWithoutUploaderInput, {nullable:true})
    @Type(() => UploadedFileCreateNestedManyWithoutUploaderInput)
    uploadedFiles?: UploadedFileCreateNestedManyWithoutUploaderInput;
}
