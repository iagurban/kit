import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemCreateWithoutParentInput } from './item-create-without-parent.input';
import { Type } from 'class-transformer';
import { ItemCreateOrConnectWithoutParentInput } from './item-create-or-connect-without-parent.input';
import { ItemCreateManyParentInputEnvelope } from './item-create-many-parent-input-envelope.input';
import { Prisma } from '../../db-client';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemUncheckedCreateNestedManyWithoutParentInput {

    @Field(() => [ItemCreateWithoutParentInput], {nullable:true})
    @Type(() => ItemCreateWithoutParentInput)
    create?: Array<ItemCreateWithoutParentInput>;

    @Field(() => [ItemCreateOrConnectWithoutParentInput], {nullable:true})
    @Type(() => ItemCreateOrConnectWithoutParentInput)
    connectOrCreate?: Array<ItemCreateOrConnectWithoutParentInput>;

    @Field(() => ItemCreateManyParentInputEnvelope, {nullable:true})
    @Type(() => ItemCreateManyParentInputEnvelope)
    createMany?: ItemCreateManyParentInputEnvelope;

    @Field(() => [ItemWhereUniqueInput], {nullable:true})
    @Type(() => ItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>>;
}
