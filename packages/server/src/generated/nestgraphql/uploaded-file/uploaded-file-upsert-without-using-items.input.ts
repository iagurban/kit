import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UploadedFileUpdateWithoutUsingItemsInput } from './uploaded-file-update-without-using-items.input';
import { Type } from 'class-transformer';
import { UploadedFileCreateWithoutUsingItemsInput } from './uploaded-file-create-without-using-items.input';
import { UploadedFileWhereInput } from './uploaded-file-where.input';

@InputType()
export class UploadedFileUpsertWithoutUsingItemsInput {

    @Field(() => UploadedFileUpdateWithoutUsingItemsInput, {nullable:false})
    @Type(() => UploadedFileUpdateWithoutUsingItemsInput)
    update!: UploadedFileUpdateWithoutUsingItemsInput;

    @Field(() => UploadedFileCreateWithoutUsingItemsInput, {nullable:false})
    @Type(() => UploadedFileCreateWithoutUsingItemsInput)
    create!: UploadedFileCreateWithoutUsingItemsInput;

    @Field(() => UploadedFileWhereInput, {nullable:true})
    @Type(() => UploadedFileWhereInput)
    where?: UploadedFileWhereInput;
}
