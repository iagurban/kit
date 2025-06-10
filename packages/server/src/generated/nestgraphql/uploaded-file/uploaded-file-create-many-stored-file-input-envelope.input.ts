import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UploadedFileCreateManyStoredFileInput } from './uploaded-file-create-many-stored-file.input';
import { Type } from 'class-transformer';

@InputType()
export class UploadedFileCreateManyStoredFileInputEnvelope {

    @Field(() => [UploadedFileCreateManyStoredFileInput], {nullable:false})
    @Type(() => UploadedFileCreateManyStoredFileInput)
    data!: Array<UploadedFileCreateManyStoredFileInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
