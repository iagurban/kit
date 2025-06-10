import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutMenusInput } from './user-create-without-menus.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutMenusInput } from './user-create-or-connect-without-menus.input';
import { Prisma } from '../../db-client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutMenusInput {

    @Field(() => UserCreateWithoutMenusInput, {nullable:true})
    @Type(() => UserCreateWithoutMenusInput)
    create?: UserCreateWithoutMenusInput;

    @Field(() => UserCreateOrConnectWithoutMenusInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutMenusInput)
    connectOrCreate?: UserCreateOrConnectWithoutMenusInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;
}
