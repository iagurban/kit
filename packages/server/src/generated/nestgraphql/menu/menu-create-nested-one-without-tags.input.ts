import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuCreateWithoutTagsInput } from './menu-create-without-tags.input';
import { Type } from 'class-transformer';
import { MenuCreateOrConnectWithoutTagsInput } from './menu-create-or-connect-without-tags.input';
import { Prisma } from '../../db-client';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@InputType()
export class MenuCreateNestedOneWithoutTagsInput {

    @Field(() => MenuCreateWithoutTagsInput, {nullable:true})
    @Type(() => MenuCreateWithoutTagsInput)
    create?: MenuCreateWithoutTagsInput;

    @Field(() => MenuCreateOrConnectWithoutTagsInput, {nullable:true})
    @Type(() => MenuCreateOrConnectWithoutTagsInput)
    connectOrCreate?: MenuCreateOrConnectWithoutTagsInput;

    @Field(() => MenuWhereUniqueInput, {nullable:true})
    @Type(() => MenuWhereUniqueInput)
    connect?: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;
}
