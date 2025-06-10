import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemCreateWithoutMenuInput } from './item-create-without-menu.input';
import { Type } from 'class-transformer';
import { ItemCreateOrConnectWithoutMenuInput } from './item-create-or-connect-without-menu.input';
import { ItemCreateManyMenuInputEnvelope } from './item-create-many-menu-input-envelope.input';
import { Prisma } from '../../db-client';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemUncheckedCreateNestedManyWithoutMenuInput {

    @Field(() => [ItemCreateWithoutMenuInput], {nullable:true})
    @Type(() => ItemCreateWithoutMenuInput)
    create?: Array<ItemCreateWithoutMenuInput>;

    @Field(() => [ItemCreateOrConnectWithoutMenuInput], {nullable:true})
    @Type(() => ItemCreateOrConnectWithoutMenuInput)
    connectOrCreate?: Array<ItemCreateOrConnectWithoutMenuInput>;

    @Field(() => ItemCreateManyMenuInputEnvelope, {nullable:true})
    @Type(() => ItemCreateManyMenuInputEnvelope)
    createMany?: ItemCreateManyMenuInputEnvelope;

    @Field(() => [ItemWhereUniqueInput], {nullable:true})
    @Type(() => ItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>>;
}
