import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { MenuWhereUniqueInput } from './menu-where-unique.input';
import { Type } from 'class-transformer';
import { MenuCreateWithoutTagsInput } from './menu-create-without-tags.input';

@InputType()
export class MenuCreateOrConnectWithoutTagsInput {

    @Field(() => MenuWhereUniqueInput, {nullable:false})
    @Type(() => MenuWhereUniqueInput)
    where!: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

    @Field(() => MenuCreateWithoutTagsInput, {nullable:false})
    @Type(() => MenuCreateWithoutTagsInput)
    create!: MenuCreateWithoutTagsInput;
}
