import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuCreateWithoutOwnerInput } from './menu-create-without-owner.input';
import { Type } from 'class-transformer';
import { MenuCreateOrConnectWithoutOwnerInput } from './menu-create-or-connect-without-owner.input';
import { MenuUpsertWithWhereUniqueWithoutOwnerInput } from './menu-upsert-with-where-unique-without-owner.input';
import { MenuCreateManyOwnerInputEnvelope } from './menu-create-many-owner-input-envelope.input';
import { Prisma } from '../../db-client';
import { MenuWhereUniqueInput } from './menu-where-unique.input';
import { MenuUpdateWithWhereUniqueWithoutOwnerInput } from './menu-update-with-where-unique-without-owner.input';
import { MenuUpdateManyWithWhereWithoutOwnerInput } from './menu-update-many-with-where-without-owner.input';
import { MenuScalarWhereInput } from './menu-scalar-where.input';

@InputType()
export class MenuUpdateManyWithoutOwnerNestedInput {

    @Field(() => [MenuCreateWithoutOwnerInput], {nullable:true})
    @Type(() => MenuCreateWithoutOwnerInput)
    create?: Array<MenuCreateWithoutOwnerInput>;

    @Field(() => [MenuCreateOrConnectWithoutOwnerInput], {nullable:true})
    @Type(() => MenuCreateOrConnectWithoutOwnerInput)
    connectOrCreate?: Array<MenuCreateOrConnectWithoutOwnerInput>;

    @Field(() => [MenuUpsertWithWhereUniqueWithoutOwnerInput], {nullable:true})
    @Type(() => MenuUpsertWithWhereUniqueWithoutOwnerInput)
    upsert?: Array<MenuUpsertWithWhereUniqueWithoutOwnerInput>;

    @Field(() => MenuCreateManyOwnerInputEnvelope, {nullable:true})
    @Type(() => MenuCreateManyOwnerInputEnvelope)
    createMany?: MenuCreateManyOwnerInputEnvelope;

    @Field(() => [MenuWhereUniqueInput], {nullable:true})
    @Type(() => MenuWhereUniqueInput)
    set?: Array<Prisma.AtLeast<MenuWhereUniqueInput, 'id'>>;

    @Field(() => [MenuWhereUniqueInput], {nullable:true})
    @Type(() => MenuWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<MenuWhereUniqueInput, 'id'>>;

    @Field(() => [MenuWhereUniqueInput], {nullable:true})
    @Type(() => MenuWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<MenuWhereUniqueInput, 'id'>>;

    @Field(() => [MenuWhereUniqueInput], {nullable:true})
    @Type(() => MenuWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<MenuWhereUniqueInput, 'id'>>;

    @Field(() => [MenuUpdateWithWhereUniqueWithoutOwnerInput], {nullable:true})
    @Type(() => MenuUpdateWithWhereUniqueWithoutOwnerInput)
    update?: Array<MenuUpdateWithWhereUniqueWithoutOwnerInput>;

    @Field(() => [MenuUpdateManyWithWhereWithoutOwnerInput], {nullable:true})
    @Type(() => MenuUpdateManyWithWhereWithoutOwnerInput)
    updateMany?: Array<MenuUpdateManyWithWhereWithoutOwnerInput>;

    @Field(() => [MenuScalarWhereInput], {nullable:true})
    @Type(() => MenuScalarWhereInput)
    deleteMany?: Array<MenuScalarWhereInput>;
}
