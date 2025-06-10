import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class MenuScalarWhereInput {

    @Field(() => [MenuScalarWhereInput], {nullable:true})
    AND?: Array<MenuScalarWhereInput>;

    @Field(() => [MenuScalarWhereInput], {nullable:true})
    OR?: Array<MenuScalarWhereInput>;

    @Field(() => [MenuScalarWhereInput], {nullable:true})
    NOT?: Array<MenuScalarWhereInput>;

    @Field(() => UuidFilter, {nullable:true})
    id?: UuidFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => StringFilter, {nullable:true})
    title?: StringFilter;

    @Field(() => UuidFilter, {nullable:true})
    ownerId?: UuidFilter;
}
