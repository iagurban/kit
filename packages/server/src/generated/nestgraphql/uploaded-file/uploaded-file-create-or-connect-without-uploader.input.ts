import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';
import { Type } from 'class-transformer';
import { UploadedFileCreateWithoutUploaderInput } from './uploaded-file-create-without-uploader.input';

@InputType()
export class UploadedFileCreateOrConnectWithoutUploaderInput {

    @Field(() => UploadedFileWhereUniqueInput, {nullable:false})
    @Type(() => UploadedFileWhereUniqueInput)
    where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

    @Field(() => UploadedFileCreateWithoutUploaderInput, {nullable:false})
    @Type(() => UploadedFileCreateWithoutUploaderInput)
    create!: UploadedFileCreateWithoutUploaderInput;
}
