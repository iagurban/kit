import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { StoredFileUpdateManyMutationInput } from './stored-file-update-many-mutation.input';
import { Type } from 'class-transformer';
import { StoredFileWhereInput } from './stored-file-where.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateManyStoredFileArgs {

    @Field(() => StoredFileUpdateManyMutationInput, {nullable:false})
    @Type(() => StoredFileUpdateManyMutationInput)
    data!: StoredFileUpdateManyMutationInput;

    @Field(() => StoredFileWhereInput, {nullable:true})
    @Type(() => StoredFileWhereInput)
    where?: StoredFileWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
