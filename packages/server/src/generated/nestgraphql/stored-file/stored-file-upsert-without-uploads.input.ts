import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StoredFileUpdateWithoutUploadsInput } from './stored-file-update-without-uploads.input';
import { Type } from 'class-transformer';
import { StoredFileCreateWithoutUploadsInput } from './stored-file-create-without-uploads.input';
import { StoredFileWhereInput } from './stored-file-where.input';

@InputType()
export class StoredFileUpsertWithoutUploadsInput {

    @Field(() => StoredFileUpdateWithoutUploadsInput, {nullable:false})
    @Type(() => StoredFileUpdateWithoutUploadsInput)
    update!: StoredFileUpdateWithoutUploadsInput;

    @Field(() => StoredFileCreateWithoutUploadsInput, {nullable:false})
    @Type(() => StoredFileCreateWithoutUploadsInput)
    create!: StoredFileCreateWithoutUploadsInput;

    @Field(() => StoredFileWhereInput, {nullable:true})
    @Type(() => StoredFileWhereInput)
    where?: StoredFileWhereInput;
}
