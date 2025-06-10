import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';
import { Type } from 'class-transformer';
import { UploadedFileUpdateWithoutStoredFileInput } from './uploaded-file-update-without-stored-file.input';
import { UploadedFileCreateWithoutStoredFileInput } from './uploaded-file-create-without-stored-file.input';

@InputType()
export class UploadedFileUpsertWithWhereUniqueWithoutStoredFileInput {

    @Field(() => UploadedFileWhereUniqueInput, {nullable:false})
    @Type(() => UploadedFileWhereUniqueInput)
    where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

    @Field(() => UploadedFileUpdateWithoutStoredFileInput, {nullable:false})
    @Type(() => UploadedFileUpdateWithoutStoredFileInput)
    update!: UploadedFileUpdateWithoutStoredFileInput;

    @Field(() => UploadedFileCreateWithoutStoredFileInput, {nullable:false})
    @Type(() => UploadedFileCreateWithoutStoredFileInput)
    create!: UploadedFileCreateWithoutStoredFileInput;
}
