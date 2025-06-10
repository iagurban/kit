import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemCreateWithoutImageInput } from './item-create-without-image.input';
import { Type } from 'class-transformer';
import { ItemCreateOrConnectWithoutImageInput } from './item-create-or-connect-without-image.input';
import { ItemUpsertWithWhereUniqueWithoutImageInput } from './item-upsert-with-where-unique-without-image.input';
import { ItemCreateManyImageInputEnvelope } from './item-create-many-image-input-envelope.input';
import { Prisma } from '../../db-client';
import { ItemWhereUniqueInput } from './item-where-unique.input';
import { ItemUpdateWithWhereUniqueWithoutImageInput } from './item-update-with-where-unique-without-image.input';
import { ItemUpdateManyWithWhereWithoutImageInput } from './item-update-many-with-where-without-image.input';
import { ItemScalarWhereInput } from './item-scalar-where.input';

@InputType()
export class ItemUncheckedUpdateManyWithoutImageNestedInput {

    @Field(() => [ItemCreateWithoutImageInput], {nullable:true})
    @Type(() => ItemCreateWithoutImageInput)
    create?: Array<ItemCreateWithoutImageInput>;

    @Field(() => [ItemCreateOrConnectWithoutImageInput], {nullable:true})
    @Type(() => ItemCreateOrConnectWithoutImageInput)
    connectOrCreate?: Array<ItemCreateOrConnectWithoutImageInput>;

    @Field(() => [ItemUpsertWithWhereUniqueWithoutImageInput], {nullable:true})
    @Type(() => ItemUpsertWithWhereUniqueWithoutImageInput)
    upsert?: Array<ItemUpsertWithWhereUniqueWithoutImageInput>;

    @Field(() => ItemCreateManyImageInputEnvelope, {nullable:true})
    @Type(() => ItemCreateManyImageInputEnvelope)
    createMany?: ItemCreateManyImageInputEnvelope;

    @Field(() => [ItemWhereUniqueInput], {nullable:true})
    @Type(() => ItemWhereUniqueInput)
    set?: Array<Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>>;

    @Field(() => [ItemWhereUniqueInput], {nullable:true})
    @Type(() => ItemWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>>;

    @Field(() => [ItemWhereUniqueInput], {nullable:true})
    @Type(() => ItemWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>>;

    @Field(() => [ItemWhereUniqueInput], {nullable:true})
    @Type(() => ItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>>;

    @Field(() => [ItemUpdateWithWhereUniqueWithoutImageInput], {nullable:true})
    @Type(() => ItemUpdateWithWhereUniqueWithoutImageInput)
    update?: Array<ItemUpdateWithWhereUniqueWithoutImageInput>;

    @Field(() => [ItemUpdateManyWithWhereWithoutImageInput], {nullable:true})
    @Type(() => ItemUpdateManyWithWhereWithoutImageInput)
    updateMany?: Array<ItemUpdateManyWithWhereWithoutImageInput>;

    @Field(() => [ItemScalarWhereInput], {nullable:true})
    @Type(() => ItemScalarWhereInput)
    deleteMany?: Array<ItemScalarWhereInput>;
}
