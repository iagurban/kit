import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemUpdateWithoutChildrenInput } from './item-update-without-children.input';
import { Type } from 'class-transformer';
import { ItemCreateWithoutChildrenInput } from './item-create-without-children.input';
import { ItemWhereInput } from './item-where.input';

@InputType()
export class ItemUpsertWithoutChildrenInput {

    @Field(() => ItemUpdateWithoutChildrenInput, {nullable:false})
    @Type(() => ItemUpdateWithoutChildrenInput)
    update!: ItemUpdateWithoutChildrenInput;

    @Field(() => ItemCreateWithoutChildrenInput, {nullable:false})
    @Type(() => ItemCreateWithoutChildrenInput)
    create!: ItemCreateWithoutChildrenInput;

    @Field(() => ItemWhereInput, {nullable:true})
    @Type(() => ItemWhereInput)
    where?: ItemWhereInput;
}
