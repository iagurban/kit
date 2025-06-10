import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemMenuIdParentIdOrderKeyCompoundUniqueInput } from './item-menu-id-parent-id-order-key-compound-unique.input';
import { Type } from 'class-transformer';
import { ItemWhereInput } from './item-where.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { DecimalNullableFilter } from '../prisma/decimal-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UuidNullableFilter } from '../prisma/uuid-nullable-filter.input';
import { UploadedFileNullableScalarRelationFilter } from '../uploaded-file/uploaded-file-nullable-scalar-relation-filter.input';
import { MenuScalarRelationFilter } from '../menu/menu-scalar-relation-filter.input';
import { ItemNullableScalarRelationFilter } from './item-nullable-scalar-relation-filter.input';
import { ItemListRelationFilter } from './item-list-relation-filter.input';

@InputType()
export class ItemWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => ItemMenuIdParentIdOrderKeyCompoundUniqueInput, {nullable:true})
    @Type(() => ItemMenuIdParentIdOrderKeyCompoundUniqueInput)
    menuId_parentId_orderKey?: ItemMenuIdParentIdOrderKeyCompoundUniqueInput;

    @Field(() => [ItemWhereInput], {nullable:true})
    @Type(() => ItemWhereInput)
    AND?: Array<ItemWhereInput>;

    @Field(() => [ItemWhereInput], {nullable:true})
    @Type(() => ItemWhereInput)
    OR?: Array<ItemWhereInput>;

    @Field(() => [ItemWhereInput], {nullable:true})
    @Type(() => ItemWhereInput)
    NOT?: Array<ItemWhereInput>;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => StringFilter, {nullable:true})
    orderKey?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    title?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    description?: StringNullableFilter;

    @Field(() => DecimalNullableFilter, {nullable:true})
    @Type(() => DecimalNullableFilter)
    price?: DecimalNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    archived?: BoolFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    imageId?: StringNullableFilter;

    @Field(() => UuidFilter, {nullable:true})
    menuId?: UuidFilter;

    @Field(() => UuidNullableFilter, {nullable:true})
    parentId?: UuidNullableFilter;

    @Field(() => UploadedFileNullableScalarRelationFilter, {nullable:true})
    @Type(() => UploadedFileNullableScalarRelationFilter)
    image?: UploadedFileNullableScalarRelationFilter;

    @Field(() => MenuScalarRelationFilter, {nullable:true})
    @Type(() => MenuScalarRelationFilter)
    menu?: MenuScalarRelationFilter;

    @Field(() => ItemNullableScalarRelationFilter, {nullable:true})
    @Type(() => ItemNullableScalarRelationFilter)
    parent?: ItemNullableScalarRelationFilter;

    @Field(() => ItemListRelationFilter, {nullable:true})
    @Type(() => ItemListRelationFilter)
    children?: ItemListRelationFilter;
}
