import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ItemWhereInput } from './item-where.input';
import { Type } from 'class-transformer';
import { ItemOrderByWithRelationInput } from './item-order-by-with-relation.input';
import { Prisma } from '../../db-client';
import { ItemWhereUniqueInput } from './item-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ItemCountAggregateInput } from './item-count-aggregate.input';
import { ItemAvgAggregateInput } from './item-avg-aggregate.input';
import { ItemSumAggregateInput } from './item-sum-aggregate.input';
import { ItemMinAggregateInput } from './item-min-aggregate.input';
import { ItemMaxAggregateInput } from './item-max-aggregate.input';

@ArgsType()
export class ItemAggregateArgs {

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

    @Field(() => ItemCountAggregateInput, {nullable:true})
    @Type(() => ItemCountAggregateInput)
    _count?: ItemCountAggregateInput;

    @Field(() => ItemAvgAggregateInput, {nullable:true})
    @Type(() => ItemAvgAggregateInput)
    _avg?: ItemAvgAggregateInput;

    @Field(() => ItemSumAggregateInput, {nullable:true})
    @Type(() => ItemSumAggregateInput)
    _sum?: ItemSumAggregateInput;

    @Field(() => ItemMinAggregateInput, {nullable:true})
    @Type(() => ItemMinAggregateInput)
    _min?: ItemMinAggregateInput;

    @Field(() => ItemMaxAggregateInput, {nullable:true})
    @Type(() => ItemMaxAggregateInput)
    _max?: ItemMaxAggregateInput;
}
