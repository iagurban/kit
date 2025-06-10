import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StoredFileWhereInput } from './stored-file-where.input';

@InputType()
export class StoredFileScalarRelationFilter {

    @Field(() => StoredFileWhereInput, {nullable:true})
    is?: StoredFileWhereInput;

    @Field(() => StoredFileWhereInput, {nullable:true})
    isNot?: StoredFileWhereInput;
}
