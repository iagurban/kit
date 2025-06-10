import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { StoredFileWhereUniqueInput } from './stored-file-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueStoredFileOrThrowArgs {

    @Field(() => StoredFileWhereUniqueInput, {nullable:false})
    @Type(() => StoredFileWhereUniqueInput)
    where!: Prisma.AtLeast<StoredFileWhereUniqueInput, 'id'>;
}
