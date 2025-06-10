import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { MenuWhereUniqueInput } from './menu-where-unique.input';
import { Type } from 'class-transformer';
import { MenuCreateWithoutItemsInput } from './menu-create-without-items.input';

@InputType()
export class MenuCreateOrConnectWithoutItemsInput {

    @Field(() => MenuWhereUniqueInput, {nullable:false})
    @Type(() => MenuWhereUniqueInput)
    where!: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

    @Field(() => MenuCreateWithoutItemsInput, {nullable:false})
    @Type(() => MenuCreateWithoutItemsInput)
    create!: MenuCreateWithoutItemsInput;
}
