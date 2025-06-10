import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UploadedFileUpdateInput } from './uploaded-file-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';

@ArgsType()
export class UpdateOneUploadedFileArgs {

    @Field(() => UploadedFileUpdateInput, {nullable:false})
    @Type(() => UploadedFileUpdateInput)
    data!: UploadedFileUpdateInput;

    @Field(() => UploadedFileWhereUniqueInput, {nullable:false})
    @Type(() => UploadedFileWhereUniqueInput)
    where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;
}
