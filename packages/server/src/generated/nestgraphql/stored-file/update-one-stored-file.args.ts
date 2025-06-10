import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StoredFileUpdateInput } from './stored-file-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '../../db-client';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';

@ArgsType()
export class UpdateOneStoredFileArgs {

    @Field(() => StoredFileUpdateInput, {nullable:false})
    @Type(() => StoredFileUpdateInput)
    data!: StoredFileUpdateInput;

    @Field(() => StoredFileWhereUniqueInput, {nullable:false})
    @Type(() => StoredFileWhereUniqueInput)
    where!: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id'>;
}
