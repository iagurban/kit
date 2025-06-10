import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { ItemWhereUniqueInput } from './item-where-unique.input';
import { Type } from 'class-transformer';
import { ItemUpdateWithoutParentInput } from './item-update-without-parent.input';
import { ItemCreateWithoutParentInput } from './item-create-without-parent.input';

@InputType()
export class ItemUpsertWithWhereUniqueWithoutParentInput {

    @Field(() => ItemWhereUniqueInput, {nullable:false})
    @Type(() => ItemWhereUniqueInput)
    where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

    @Field(() => ItemUpdateWithoutParentInput, {nullable:false})
    @Type(() => ItemUpdateWithoutParentInput)
    update!: ItemUpdateWithoutParentInput;

    @Field(() => ItemCreateWithoutParentInput, {nullable:false})
    @Type(() => ItemCreateWithoutParentInput)
    create!: ItemCreateWithoutParentInput;
}
