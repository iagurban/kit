import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UploadedFileCreateManyMenuInput } from './uploaded-file-create-many-menu.input';
import { Type } from 'class-transformer';

@InputType()
export class UploadedFileCreateManyMenuInputEnvelope {

    @Field(() => [UploadedFileCreateManyMenuInput], {nullable:false})
    @Type(() => UploadedFileCreateManyMenuInput)
    data!: Array<UploadedFileCreateManyMenuInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
