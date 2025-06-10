import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';
import { Type } from 'class-transformer';
import { UploadedFileCreateInput } from './uploaded-file-create.input';
import { UploadedFileUpdateInput } from './uploaded-file-update.input';

@ArgsType()
export class UpsertOneUploadedFileArgs {

    @Field(() => UploadedFileWhereUniqueInput, {nullable:false})
    @Type(() => UploadedFileWhereUniqueInput)
    where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

    @Field(() => UploadedFileCreateInput, {nullable:false})
    @Type(() => UploadedFileCreateInput)
    create!: UploadedFileCreateInput;

    @Field(() => UploadedFileUpdateInput, {nullable:false})
    @Type(() => UploadedFileUpdateInput)
    update!: UploadedFileUpdateInput;
}
