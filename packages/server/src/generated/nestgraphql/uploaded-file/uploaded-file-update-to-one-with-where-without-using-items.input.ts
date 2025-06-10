import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UploadedFileWhereInput } from './uploaded-file-where.input';
import { Type } from 'class-transformer';
import { UploadedFileUpdateWithoutUsingItemsInput } from './uploaded-file-update-without-using-items.input';

@InputType()
export class UploadedFileUpdateToOneWithWhereWithoutUsingItemsInput {

    @Field(() => UploadedFileWhereInput, {nullable:true})
    @Type(() => UploadedFileWhereInput)
    where?: UploadedFileWhereInput;

    @Field(() => UploadedFileUpdateWithoutUsingItemsInput, {nullable:false})
    @Type(() => UploadedFileUpdateWithoutUsingItemsInput)
    data!: UploadedFileUpdateWithoutUsingItemsInput;
}
