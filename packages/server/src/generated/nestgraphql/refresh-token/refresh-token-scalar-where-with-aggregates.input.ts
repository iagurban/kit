import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class RefreshTokenScalarWhereWithAggregatesInput {

    @Field(() => [RefreshTokenScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<RefreshTokenScalarWhereWithAggregatesInput>;

    @Field(() => [RefreshTokenScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<RefreshTokenScalarWhereWithAggregatesInput>;

    @Field(() => [RefreshTokenScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<RefreshTokenScalarWhereWithAggregatesInput>;

    @Field(() => UuidWithAggregatesFilter, {nullable:true})
    id?: UuidWithAggregatesFilter;

    @Field(() => UuidWithAggregatesFilter, {nullable:true})
    userId?: UuidWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: DateTimeWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    expiresAt?: DateTimeWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    hash?: StringWithAggregatesFilter;
}
