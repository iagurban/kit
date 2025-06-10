import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { ItemWhereUniqueInput } from './item-where-unique.input';
import { Type } from 'class-transformer';
import { ItemCreateWithoutChildrenInput } from './item-create-without-children.input';

@InputType()
export class ItemCreateOrConnectWithoutChildrenInput {

    @Field(() => ItemWhereUniqueInput, {nullable:false})
    @Type(() => ItemWhereUniqueInput)
    where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

    @Field(() => ItemCreateWithoutChildrenInput, {nullable:false})
    @Type(() => ItemCreateWithoutChildrenInput)
    create!: ItemCreateWithoutChildrenInput;
}
