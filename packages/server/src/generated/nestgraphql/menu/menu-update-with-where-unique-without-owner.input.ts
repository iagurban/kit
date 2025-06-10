import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { MenuWhereUniqueInput } from './menu-where-unique.input';
import { Type } from 'class-transformer';
import { MenuUpdateWithoutOwnerInput } from './menu-update-without-owner.input';

@InputType()
export class MenuUpdateWithWhereUniqueWithoutOwnerInput {

    @Field(() => MenuWhereUniqueInput, {nullable:false})
    @Type(() => MenuWhereUniqueInput)
    where!: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

    @Field(() => MenuUpdateWithoutOwnerInput, {nullable:false})
    @Type(() => MenuUpdateWithoutOwnerInput)
    data!: MenuUpdateWithoutOwnerInput;
}
