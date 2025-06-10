import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemWhereInput } from './item-where.input';
import { Type } from 'class-transformer';
import { ItemUpdateWithoutChildrenInput } from './item-update-without-children.input';

@InputType()
export class ItemUpdateToOneWithWhereWithoutChildrenInput {

    @Field(() => ItemWhereInput, {nullable:true})
    @Type(() => ItemWhereInput)
    where?: ItemWhereInput;

    @Field(() => ItemUpdateWithoutChildrenInput, {nullable:false})
    @Type(() => ItemUpdateWithoutChildrenInput)
    data!: ItemUpdateWithoutChildrenInput;
}
