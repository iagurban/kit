import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UploadedFileCreateManyInput } from './uploaded-file-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyUploadedFileArgs {

    @Field(() => [UploadedFileCreateManyInput], {nullable:false})
    @Type(() => UploadedFileCreateManyInput)
    data!: Array<UploadedFileCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
