import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UploadedFileScalarWhereInput } from './uploaded-file-scalar-where.input';
import { Type } from 'class-transformer';
import { UploadedFileUpdateManyMutationInput } from './uploaded-file-update-many-mutation.input';

@InputType()
export class UploadedFileUpdateManyWithWhereWithoutUploaderInput {

    @Field(() => UploadedFileScalarWhereInput, {nullable:false})
    @Type(() => UploadedFileScalarWhereInput)
    where!: UploadedFileScalarWhereInput;

    @Field(() => UploadedFileUpdateManyMutationInput, {nullable:false})
    @Type(() => UploadedFileUpdateManyMutationInput)
    data!: UploadedFileUpdateManyMutationInput;
}
