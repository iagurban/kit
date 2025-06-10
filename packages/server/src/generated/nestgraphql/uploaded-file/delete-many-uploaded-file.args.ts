import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UploadedFileWhereInput } from './uploaded-file-where.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteManyUploadedFileArgs {

    @Field(() => UploadedFileWhereInput, {nullable:true})
    @Type(() => UploadedFileWhereInput)
    where?: UploadedFileWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
