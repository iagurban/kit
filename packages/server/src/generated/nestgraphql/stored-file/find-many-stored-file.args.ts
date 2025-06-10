import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StoredFileWhereInput } from './stored-file-where.input';
import { Type } from 'class-transformer';
import { StoredFileOrderByWithRelationInput } from './stored-file-order-by-with-relation.input';
import { Prisma } from '../../db-client';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';
import { Int } from '@nestjs/graphql';
import { StoredFileScalarFieldEnum } from './stored-file-scalar-field.enum';

@ArgsType()
export class FindManyStoredFileArgs {

    @Field(() => StoredFileWhereInput, {nullable:true})
    @Type(() => StoredFileWhereInput)
    where?: StoredFileWhereInput;

    @Field(() => [StoredFileOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<StoredFileOrderByWithRelationInput>;

    @Field(() => StoredFileWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [StoredFileScalarFieldEnum], {nullable:true})
    distinct?: Array<`${StoredFileScalarFieldEnum}`>;
}
