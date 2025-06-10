import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UploadedFileUpdateManyMutationInput } from './uploaded-file-update-many-mutation.input';
import { Type } from 'class-transformer';
import { UploadedFileWhereInput } from './uploaded-file-where.input';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class UpdateManyUploadedFileArgs {

    @Field(() => UploadedFileUpdateManyMutationInput, {nullable:false})
    @Type(() => UploadedFileUpdateManyMutationInput)
    data!: UploadedFileUpdateManyMutationInput;

    @Field(() => UploadedFileWhereInput, {nullable:true})
    @Type(() => UploadedFileWhereInput)
    where?: UploadedFileWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
