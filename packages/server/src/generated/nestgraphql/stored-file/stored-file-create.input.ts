import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { UploadedFileCreateNestedManyWithoutStoredFileInput } from '../uploaded-file/uploaded-file-create-nested-many-without-stored-file.input';
import { Type } from 'class-transformer';

@InputType()
export class StoredFileCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    hash!: string;

    @Field(() => Int, {nullable:false})
    size!: number;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => UploadedFileCreateNestedManyWithoutStoredFileInput, {nullable:true})
    @Type(() => UploadedFileCreateNestedManyWithoutStoredFileInput)
    uploads?: UploadedFileCreateNestedManyWithoutStoredFileInput;
}
