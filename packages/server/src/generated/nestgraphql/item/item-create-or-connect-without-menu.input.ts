import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { ItemWhereUniqueInput } from './item-where-unique.input';
import { Type } from 'class-transformer';
import { ItemCreateWithoutMenuInput } from './item-create-without-menu.input';

@InputType()
export class ItemCreateOrConnectWithoutMenuInput {

    @Field(() => ItemWhereUniqueInput, {nullable:false})
    @Type(() => ItemWhereUniqueInput)
    where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

    @Field(() => ItemCreateWithoutMenuInput, {nullable:false})
    @Type(() => ItemCreateWithoutMenuInput)
    create!: ItemCreateWithoutMenuInput;
}
