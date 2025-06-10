import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemCreateWithoutChildrenInput } from './item-create-without-children.input';
import { Type } from 'class-transformer';
import { ItemCreateOrConnectWithoutChildrenInput } from './item-create-or-connect-without-children.input';
import { Prisma } from '../../db-client';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemCreateNestedOneWithoutChildrenInput {

    @Field(() => ItemCreateWithoutChildrenInput, {nullable:true})
    @Type(() => ItemCreateWithoutChildrenInput)
    create?: ItemCreateWithoutChildrenInput;

    @Field(() => ItemCreateOrConnectWithoutChildrenInput, {nullable:true})
    @Type(() => ItemCreateOrConnectWithoutChildrenInput)
    connectOrCreate?: ItemCreateOrConnectWithoutChildrenInput;

    @Field(() => ItemWhereUniqueInput, {nullable:true})
    @Type(() => ItemWhereUniqueInput)
    connect?: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;
}
