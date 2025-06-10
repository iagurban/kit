import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutUploadedFilesInput } from './user-create-without-uploaded-files.input';

@InputType()
export class UserCreateOrConnectWithoutUploadedFilesInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

    @Field(() => UserCreateWithoutUploadedFilesInput, {nullable:false})
    @Type(() => UserCreateWithoutUploadedFilesInput)
    create!: UserCreateWithoutUploadedFilesInput;
}
