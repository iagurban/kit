import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ItemCreateWithoutImageInput } from './item-create-without-image.input';
import { Type } from 'class-transformer';
import { ItemCreateOrConnectWithoutImageInput } from './item-create-or-connect-without-image.input';
import { ItemCreateManyImageInputEnvelope } from './item-create-many-image-input-envelope.input';
import { Prisma } from '../../db-client';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemCreateNestedManyWithoutImageInput {

    @Field(() => [ItemCreateWithoutImageInput], {nullable:true})
    @Type(() => ItemCreateWithoutImageInput)
    create?: Array<ItemCreateWithoutImageInput>;

    @Field(() => [ItemCreateOrConnectWithoutImageInput], {nullable:true})
    @Type(() => ItemCreateOrConnectWithoutImageInput)
    connectOrCreate?: Array<ItemCreateOrConnectWithoutImageInput>;

    @Field(() => ItemCreateManyImageInputEnvelope, {nullable:true})
    @Type(() => ItemCreateManyImageInputEnvelope)
    createMany?: ItemCreateManyImageInputEnvelope;

    @Field(() => [ItemWhereUniqueInput], {nullable:true})
    @Type(() => ItemWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>>;
}
