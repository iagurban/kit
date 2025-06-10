import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { TagWhereInput } from './tag-where.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { MenuScalarRelationFilter } from '../menu/menu-scalar-relation-filter.input';
import { Type } from 'class-transformer';

@InputType()
export class TagWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => [TagWhereInput], {nullable:true})
    AND?: Array<TagWhereInput>;

    @Field(() => [TagWhereInput], {nullable:true})
    OR?: Array<TagWhereInput>;

    @Field(() => [TagWhereInput], {nullable:true})
    NOT?: Array<TagWhereInput>;

    @Field(() => UuidFilter, {nullable:true})
    menuId?: UuidFilter;

    @Field(() => MenuScalarRelationFilter, {nullable:true})
    @Type(() => MenuScalarRelationFilter)
    menu?: MenuScalarRelationFilter;
}
