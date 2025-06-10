import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ItemWhereInput } from './item-where.input';
import { Type } from 'class-transformer';
import { ItemOrderByWithRelationInput } from './item-order-by-with-relation.input';
import { Prisma } from '../../db-client';
import { ItemWhereUniqueInput } from './item-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ItemScalarFieldEnum } from './item-scalar-field.enum';

@ArgsType()
export class FindManyItemArgs {

    @Field(() => ItemWhereInput, {nullable:true})
    @Type(() => ItemWhereInput)
    where?: ItemWhereInput;

    @Field(() => [ItemOrderByWithRelationInput], {nullable:true})
    @Type(() => ItemOrderByWithRelationInput)
    orderBy?: Array<ItemOrderByWithRelationInput>;

    @Field(() => ItemWhereUniqueInput, {nullable:true})
    @Type(() => ItemWhereUniqueInput)
    cursor?: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [ItemScalarFieldEnum], {nullable:true})
    distinct?: Array<`${ItemScalarFieldEnum}`>;
}
