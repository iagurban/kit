import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StoredFileWhereInput } from './stored-file-where.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteManyStoredFileArgs {

    @Field(() => StoredFileWhereInput, {nullable:true})
    @Type(() => StoredFileWhereInput)
    where?: StoredFileWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
