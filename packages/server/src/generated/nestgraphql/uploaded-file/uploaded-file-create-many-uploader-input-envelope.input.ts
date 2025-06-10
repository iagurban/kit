import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UploadedFileCreateManyUploaderInput } from './uploaded-file-create-many-uploader.input';
import { Type } from 'class-transformer';

@InputType()
export class UploadedFileCreateManyUploaderInputEnvelope {

    @Field(() => [UploadedFileCreateManyUploaderInput], {nullable:false})
    @Type(() => UploadedFileCreateManyUploaderInput)
    data!: Array<UploadedFileCreateManyUploaderInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
