import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { DecimalNullableWithAggregatesFilter } from '../prisma/decimal-nullable-with-aggregates-filter.input';
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input';
import { UuidNullableWithAggregatesFilter } from '../prisma/uuid-nullable-with-aggregates-filter.input';

@InputType()
export class ItemScalarWhereWithAggregatesInput {

    @Field(() => [ItemScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => ItemScalarWhereWithAggregatesInput)
    AND?: Array<ItemScalarWhereWithAggregatesInput>;

    @Field(() => [ItemScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => ItemScalarWhereWithAggregatesInput)
    OR?: Array<ItemScalarWhereWithAggregatesInput>;

    @Field(() => [ItemScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => ItemScalarWhereWithAggregatesInput)
    NOT?: Array<ItemScalarWhereWithAggregatesInput>;

    @Field(() => UuidWithAggregatesFilter, {nullable:true})
    id?: UuidWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: DateTimeWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    orderKey?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    title?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    description?: StringNullableWithAggregatesFilter;

    @Field(() => DecimalNullableWithAggregatesFilter, {nullable:true})
    @Type(() => DecimalNullableWithAggregatesFilter)
    price?: DecimalNullableWithAggregatesFilter;

    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    archived?: BoolWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    imageId?: StringNullableWithAggregatesFilter;

    @Field(() => UuidWithAggregatesFilter, {nullable:true})
    menuId?: UuidWithAggregatesFilter;

    @Field(() => UuidNullableWithAggregatesFilter, {nullable:true})
    parentId?: UuidNullableWithAggregatesFilter;
}
