import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';
import { Type } from 'class-transformer';
import { UploadedFileUpdateWithoutMenuInput } from './uploaded-file-update-without-menu.input';
import { UploadedFileCreateWithoutMenuInput } from './uploaded-file-create-without-menu.input';

@InputType()
export class UploadedFileUpsertWithWhereUniqueWithoutMenuInput {

    @Field(() => UploadedFileWhereUniqueInput, {nullable:false})
    @Type(() => UploadedFileWhereUniqueInput)
    where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

    @Field(() => UploadedFileUpdateWithoutMenuInput, {nullable:false})
    @Type(() => UploadedFileUpdateWithoutMenuInput)
    update!: UploadedFileUpdateWithoutMenuInput;

    @Field(() => UploadedFileCreateWithoutMenuInput, {nullable:false})
    @Type(() => UploadedFileCreateWithoutMenuInput)
    create!: UploadedFileCreateWithoutMenuInput;
}
