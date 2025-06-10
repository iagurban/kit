import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemWhereInput } from './item-where.input';
import { Type } from 'class-transformer';

@InputType()
export class ItemNullableScalarRelationFilter {

    @Field(() => ItemWhereInput, {nullable:true})
    @Type(() => ItemWhereInput)
    is?: ItemWhereInput;

    @Field(() => ItemWhereInput, {nullable:true})
    @Type(() => ItemWhereInput)
    isNot?: ItemWhereInput;
}
