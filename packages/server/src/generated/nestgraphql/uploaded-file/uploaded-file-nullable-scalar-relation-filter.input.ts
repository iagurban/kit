import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UploadedFileWhereInput } from './uploaded-file-where.input';

@InputType()
export class UploadedFileNullableScalarRelationFilter {

    @Field(() => UploadedFileWhereInput, {nullable:true})
    is?: UploadedFileWhereInput;

    @Field(() => UploadedFileWhereInput, {nullable:true})
    isNot?: UploadedFileWhereInput;
}
