import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { ItemWhereUniqueInput } from './item-where-unique.input';
import { Type } from 'class-transformer';
import { ItemUpdateWithoutImageInput } from './item-update-without-image.input';
import { ItemCreateWithoutImageInput } from './item-create-without-image.input';

@InputType()
export class ItemUpsertWithWhereUniqueWithoutImageInput {

    @Field(() => ItemWhereUniqueInput, {nullable:false})
    @Type(() => ItemWhereUniqueInput)
    where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

    @Field(() => ItemUpdateWithoutImageInput, {nullable:false})
    @Type(() => ItemUpdateWithoutImageInput)
    update!: ItemUpdateWithoutImageInput;

    @Field(() => ItemCreateWithoutImageInput, {nullable:false})
    @Type(() => ItemCreateWithoutImageInput)
    create!: ItemCreateWithoutImageInput;
}
