import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutUploadedFilesInput } from './user-update-without-uploaded-files.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutUploadedFilesInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutUploadedFilesInput, {nullable:false})
    @Type(() => UserUpdateWithoutUploadedFilesInput)
    data!: UserUpdateWithoutUploadedFilesInput;
}
