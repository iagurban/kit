import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UploadedFileWhereInput } from './uploaded-file-where.input';
import { Type } from 'class-transformer';
import { UploadedFileOrderByWithRelationInput } from './uploaded-file-order-by-with-relation.input';
import { Prisma } from '../../db-client';
import { UploadedFileWhereUniqueInput } from './uploaded-file-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UploadedFileScalarFieldEnum } from './uploaded-file-scalar-field.enum';

@ArgsType()
export class FindFirstUploadedFileArgs {

    @Field(() => UploadedFileWhereInput, {nullable:true})
    @Type(() => UploadedFileWhereInput)
    where?: UploadedFileWhereInput;

    @Field(() => [UploadedFileOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UploadedFileOrderByWithRelationInput>;

    @Field(() => UploadedFileWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UploadedFileWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [UploadedFileScalarFieldEnum], {nullable:true})
    distinct?: Array<`${UploadedFileScalarFieldEnum}`>;
}
