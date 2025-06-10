import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuCreateWithoutItemsInput } from './menu-create-without-items.input';
import { Type } from 'class-transformer';
import { MenuCreateOrConnectWithoutItemsInput } from './menu-create-or-connect-without-items.input';
import { Prisma } from '../../db-client';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@InputType()
export class MenuCreateNestedOneWithoutItemsInput {

    @Field(() => MenuCreateWithoutItemsInput, {nullable:true})
    @Type(() => MenuCreateWithoutItemsInput)
    create?: MenuCreateWithoutItemsInput;

    @Field(() => MenuCreateOrConnectWithoutItemsInput, {nullable:true})
    @Type(() => MenuCreateOrConnectWithoutItemsInput)
    connectOrCreate?: MenuCreateOrConnectWithoutItemsInput;

    @Field(() => MenuWhereUniqueInput, {nullable:true})
    @Type(() => MenuWhereUniqueInput)
    connect?: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;
}
