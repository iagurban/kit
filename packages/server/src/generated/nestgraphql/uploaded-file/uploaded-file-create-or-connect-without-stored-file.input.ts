import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';
import { Type } from 'class-transformer';
import { UploadedFileCreateWithoutStoredFileInput } from './uploaded-file-create-without-stored-file.input';

@InputType()
export class UploadedFileCreateOrConnectWithoutStoredFileInput {

    @Field(() => UploadedFileWhereUniqueInput, {nullable:false})
    @Type(() => UploadedFileWhereUniqueInput)
    where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

    @Field(() => UploadedFileCreateWithoutStoredFileInput, {nullable:false})
    @Type(() => UploadedFileCreateWithoutStoredFileInput)
    create!: UploadedFileCreateWithoutStoredFileInput;
}
