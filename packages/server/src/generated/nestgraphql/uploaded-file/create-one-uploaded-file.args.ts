import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UploadedFileCreateInput } from './uploaded-file-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneUploadedFileArgs {

    @Field(() => UploadedFileCreateInput, {nullable:false})
    @Type(() => UploadedFileCreateInput)
    data!: UploadedFileCreateInput;
}
