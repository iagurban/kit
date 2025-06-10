import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';
import { Type } from 'class-transformer';
import { StoredFileCreateInput } from './stored-file-create.input';
import { StoredFileUpdateInput } from './stored-file-update.input';

@ArgsType()
export class UpsertOneStoredFileArgs {

    @Field(() => StoredFileWhereUniqueInput, {nullable:false})
    @Type(() => StoredFileWhereUniqueInput)
    where!: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id'>;

    @Field(() => StoredFileCreateInput, {nullable:false})
    @Type(() => StoredFileCreateInput)
    create!: StoredFileCreateInput;

    @Field(() => StoredFileUpdateInput, {nullable:false})
    @Type(() => StoredFileUpdateInput)
    update!: StoredFileUpdateInput;
}
