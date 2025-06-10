import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class MenuScalarWhereWithAggregatesInput {

    @Field(() => [MenuScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<MenuScalarWhereWithAggregatesInput>;

    @Field(() => [MenuScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<MenuScalarWhereWithAggregatesInput>;

    @Field(() => [MenuScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<MenuScalarWhereWithAggregatesInput>;

    @Field(() => UuidWithAggregatesFilter, {nullable:true})
    id?: UuidWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: DateTimeWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    title?: StringWithAggregatesFilter;

    @Field(() => UuidWithAggregatesFilter, {nullable:true})
    ownerId?: UuidWithAggregatesFilter;
}
