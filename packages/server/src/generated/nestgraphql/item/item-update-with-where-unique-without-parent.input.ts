import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { ItemWhereUniqueInput } from './item-where-unique.input';
import { Type } from 'class-transformer';
import { ItemUpdateWithoutParentInput } from './item-update-without-parent.input';

@InputType()
export class ItemUpdateWithWhereUniqueWithoutParentInput {

    @Field(() => ItemWhereUniqueInput, {nullable:false})
    @Type(() => ItemWhereUniqueInput)
    where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

    @Field(() => ItemUpdateWithoutParentInput, {nullable:false})
    @Type(() => ItemUpdateWithoutParentInput)
    data!: ItemUpdateWithoutParentInput;
}
