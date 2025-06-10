import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutUploadedFilesInput } from './user-create-without-uploaded-files.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutUploadedFilesInput } from './user-create-or-connect-without-uploaded-files.input';
import { UserUpsertWithoutUploadedFilesInput } from './user-upsert-without-uploaded-files.input';
import { Prisma } from '../../db-client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutUploadedFilesInput } from './user-update-to-one-with-where-without-uploaded-files.input';

@InputType()
export class UserUpdateOneRequiredWithoutUploadedFilesNestedInput {

    @Field(() => UserCreateWithoutUploadedFilesInput, {nullable:true})
    @Type(() => UserCreateWithoutUploadedFilesInput)
    create?: UserCreateWithoutUploadedFilesInput;

    @Field(() => UserCreateOrConnectWithoutUploadedFilesInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutUploadedFilesInput)
    connectOrCreate?: UserCreateOrConnectWithoutUploadedFilesInput;

    @Field(() => UserUpsertWithoutUploadedFilesInput, {nullable:true})
    @Type(() => UserUpsertWithoutUploadedFilesInput)
    upsert?: UserUpsertWithoutUploadedFilesInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

    @Field(() => UserUpdateToOneWithWhereWithoutUploadedFilesInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutUploadedFilesInput)
    update?: UserUpdateToOneWithWhereWithoutUploadedFilesInput;
}
