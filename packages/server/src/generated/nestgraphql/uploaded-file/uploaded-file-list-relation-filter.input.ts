import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UploadedFileWhereInput } from './uploaded-file-where.input';

@InputType()
export class UploadedFileListRelationFilter {

    @Field(() => UploadedFileWhereInput, {nullable:true})
    every?: UploadedFileWhereInput;

    @Field(() => UploadedFileWhereInput, {nullable:true})
    some?: UploadedFileWhereInput;

    @Field(() => UploadedFileWhereInput, {nullable:true})
    none?: UploadedFileWhereInput;
}
