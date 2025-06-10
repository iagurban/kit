import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MenuWhereInput } from './menu-where.input';
import { Type } from 'class-transformer';
import { MenuOrderByWithAggregationInput } from './menu-order-by-with-aggregation.input';
import { MenuScalarFieldEnum } from './menu-scalar-field.enum';
import { MenuScalarWhereWithAggregatesInput } from './menu-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { MenuCountAggregateInput } from './menu-count-aggregate.input';
import { MenuMinAggregateInput } from './menu-min-aggregate.input';
import { MenuMaxAggregateInput } from './menu-max-aggregate.input';

@ArgsType()
export class MenuGroupByArgs {

    @Field(() => MenuWhereInput, {nullable:true})
    @Type(() => MenuWhereInput)
    where?: MenuWhereInput;

    @Field(() => [MenuOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<MenuOrderByWithAggregationInput>;

    @Field(() => [MenuScalarFieldEnum], {nullable:false})
    by!: Array<`${MenuScalarFieldEnum}`>;

    @Field(() => MenuScalarWhereWithAggregatesInput, {nullable:true})
    having?: MenuScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => MenuCountAggregateInput, {nullable:true})
    _count?: MenuCountAggregateInput;

    @Field(() => MenuMinAggregateInput, {nullable:true})
    _min?: MenuMinAggregateInput;

    @Field(() => MenuMaxAggregateInput, {nullable:true})
    _max?: MenuMaxAggregateInput;
}
