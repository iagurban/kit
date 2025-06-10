import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutMenusInput } from './user-create-without-menus.input';

@InputType()
export class UserCreateOrConnectWithoutMenusInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'name'>;

    @Field(() => UserCreateWithoutMenusInput, {nullable:false})
    @Type(() => UserCreateWithoutMenusInput)
    create!: UserCreateWithoutMenusInput;
}
