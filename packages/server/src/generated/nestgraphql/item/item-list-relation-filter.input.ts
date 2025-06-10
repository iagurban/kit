import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemWhereInput } from './item-where.input';
import { Type } from 'class-transformer';

@InputType()
export class ItemListRelationFilter {

    @Field(() => ItemWhereInput, {nullable:true})
    @Type(() => ItemWhereInput)
    every?: ItemWhereInput;

    @Field(() => ItemWhereInput, {nullable:true})
    @Type(() => ItemWhereInput)
    some?: ItemWhereInput;

    @Field(() => ItemWhereInput, {nullable:true})
    @Type(() => ItemWhereInput)
    none?: ItemWhereInput;
}
