import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemCreateWithoutParentInput } from './item-create-without-parent.input';
import { Type } from 'class-transformer';
import { ItemCreateOrConnectWithoutParentInput } from './item-create-or-connect-without-parent.input';
import { ItemUpsertWithWhereUniqueWithoutParentInput } from './item-upsert-with-where-unique-without-parent.input';
import { ItemCreateManyParentInputEnvelope } from './item-create-many-parent-input-envelope.input';
import { Prisma } from '../../db-client';
import { ItemWhereUniqueInput } from './item-where-unique.input';
import { ItemUpdateWithWhereUniqueWithoutParentInput } from './item-update-with-where-unique-without-parent.input';
import { ItemUpdateManyWithWhereWithoutParentInput } from './item-update-many-with-where-without-parent.input';
import { ItemScalarWhereInput } from './item-scalar-where.input';

@InputType()
export class ItemUpdateManyWithoutParentNestedInput {

    @Field(() => [ItemCreateWithoutParentInput], {nullable:true})
    @Type(() => ItemCreateWithoutParentInput)
    create?: Array<ItemCreateWithoutParentInput>;

    @Field(() => [ItemCreateOrConnectWithoutParentInput], {nullable:true})
    @Type(() => ItemCreateOrConnectWithoutParentInput)
    connectOrCreate?: Array<ItemCreateOrConnectWithoutParentInput>;

    @Field(() => [ItemUpsertWithWhereUniqueWithoutParentInput], {nullable:true})
    @Type(() => ItemUpsertWithWhereUniqueWithoutParentInput)
    upsert?: Array<ItemUpsertWithWhereUniqueWithoutParentInput>;

    @Field(() => ItemCreateManyParentInputEnvelope, {nullable:true})
    @Type(() => ItemCreateManyParentInputEnvelope)
    createMany?: ItemCreateManyParentInputEnvelope;

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

    @Field(() => [ItemUpdateWithWhereUniqueWithoutParentInput], {nullable:true})
    @Type(() => ItemUpdateWithWhereUniqueWithoutParentInput)
    update?: Array<ItemUpdateWithWhereUniqueWithoutParentInput>;

    @Field(() => [ItemUpdateManyWithWhereWithoutParentInput], {nullable:true})
    @Type(() => ItemUpdateManyWithWhereWithoutParentInput)
    updateMany?: Array<ItemUpdateManyWithWhereWithoutParentInput>;

    @Field(() => [ItemScalarWhereInput], {nullable:true})
    @Type(() => ItemScalarWhereInput)
    deleteMany?: Array<ItemScalarWhereInput>;
}
