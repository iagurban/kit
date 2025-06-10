import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';
import { Type } from 'class-transformer';
import { UploadedFileUpdateWithoutUploaderInput } from './uploaded-file-update-without-uploader.input';

@InputType()
export class UploadedFileUpdateWithWhereUniqueWithoutUploaderInput {

    @Field(() => UploadedFileWhereUniqueInput, {nullable:false})
    @Type(() => UploadedFileWhereUniqueInput)
    where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

    @Field(() => UploadedFileUpdateWithoutUploaderInput, {nullable:false})
    @Type(() => UploadedFileUpdateWithoutUploaderInput)
    data!: UploadedFileUpdateWithoutUploaderInput;
}
