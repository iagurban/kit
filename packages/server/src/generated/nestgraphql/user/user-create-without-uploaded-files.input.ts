import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuCreateNestedManyWithoutOwnerInput } from '../menu/menu-create-nested-many-without-owner.input';
import { Type } from 'class-transformer';
import { RefreshTokenCreateNestedManyWithoutUserInput } from '../refresh-token/refresh-token-create-nested-many-without-user.input';

@InputType()
export class UserCreateWithoutUploadedFilesInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:false})
    passwordHash!: string;

    @Field(() => MenuCreateNestedManyWithoutOwnerInput, {nullable:true})
    @Type(() => MenuCreateNestedManyWithoutOwnerInput)
    menus?: MenuCreateNestedManyWithoutOwnerInput;

    @Field(() => RefreshTokenCreateNestedManyWithoutUserInput, {nullable:true})
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput;
}
