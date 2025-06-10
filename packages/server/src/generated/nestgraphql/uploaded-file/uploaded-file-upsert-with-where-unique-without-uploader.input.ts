import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';
import { Type } from 'class-transformer';
import { UploadedFileUpdateWithoutUploaderInput } from './uploaded-file-update-without-uploader.input';
import { UploadedFileCreateWithoutUploaderInput } from './uploaded-file-create-without-uploader.input';

@InputType()
export class UploadedFileUpsertWithWhereUniqueWithoutUploaderInput {

    @Field(() => UploadedFileWhereUniqueInput, {nullable:false})
    @Type(() => UploadedFileWhereUniqueInput)
    where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

    @Field(() => UploadedFileUpdateWithoutUploaderInput, {nullable:false})
    @Type(() => UploadedFileUpdateWithoutUploaderInput)
    update!: UploadedFileUpdateWithoutUploaderInput;

    @Field(() => UploadedFileCreateWithoutUploaderInput, {nullable:false})
    @Type(() => UploadedFileCreateWithoutUploaderInput)
    create!: UploadedFileCreateWithoutUploaderInput;
}
