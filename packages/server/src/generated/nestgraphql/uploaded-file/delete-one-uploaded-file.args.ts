import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneUploadedFileArgs {

    @Field(() => UploadedFileWhereUniqueInput, {nullable:false})
    @Type(() => UploadedFileWhereUniqueInput)
    where!: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;
}
