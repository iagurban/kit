import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuCreateWithoutOwnerInput } from './menu-create-without-owner.input';
import { Type } from 'class-transformer';
import { MenuCreateOrConnectWithoutOwnerInput } from './menu-create-or-connect-without-owner.input';
import { MenuCreateManyOwnerInputEnvelope } from './menu-create-many-owner-input-envelope.input';
import { Prisma } from '../../db-client';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@InputType()
export class MenuUncheckedCreateNestedManyWithoutOwnerInput {

    @Field(() => [MenuCreateWithoutOwnerInput], {nullable:true})
    @Type(() => MenuCreateWithoutOwnerInput)
    create?: Array<MenuCreateWithoutOwnerInput>;

    @Field(() => [MenuCreateOrConnectWithoutOwnerInput], {nullable:true})
    @Type(() => MenuCreateOrConnectWithoutOwnerInput)
    connectOrCreate?: Array<MenuCreateOrConnectWithoutOwnerInput>;

    @Field(() => MenuCreateManyOwnerInputEnvelope, {nullable:true})
    @Type(() => MenuCreateManyOwnerInputEnvelope)
    createMany?: MenuCreateManyOwnerInputEnvelope;

    @Field(() => [MenuWhereUniqueInput], {nullable:true})
    @Type(() => MenuWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<MenuWhereUniqueInput, 'id'>>;
}
