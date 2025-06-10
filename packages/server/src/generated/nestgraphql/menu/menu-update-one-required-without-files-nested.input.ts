import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuCreateWithoutFilesInput } from './menu-create-without-files.input';
import { Type } from 'class-transformer';
import { MenuCreateOrConnectWithoutFilesInput } from './menu-create-or-connect-without-files.input';
import { MenuUpsertWithoutFilesInput } from './menu-upsert-without-files.input';
import { Prisma } from '../../db-client';
import { MenuWhereUniqueInput } from './menu-where-unique.input';
import { MenuUpdateToOneWithWhereWithoutFilesInput } from './menu-update-to-one-with-where-without-files.input';

@InputType()
export class MenuUpdateOneRequiredWithoutFilesNestedInput {

    @Field(() => MenuCreateWithoutFilesInput, {nullable:true})
    @Type(() => MenuCreateWithoutFilesInput)
    create?: MenuCreateWithoutFilesInput;

    @Field(() => MenuCreateOrConnectWithoutFilesInput, {nullable:true})
    @Type(() => MenuCreateOrConnectWithoutFilesInput)
    connectOrCreate?: MenuCreateOrConnectWithoutFilesInput;

    @Field(() => MenuUpsertWithoutFilesInput, {nullable:true})
    @Type(() => MenuUpsertWithoutFilesInput)
    upsert?: MenuUpsertWithoutFilesInput;

    @Field(() => MenuWhereUniqueInput, {nullable:true})
    @Type(() => MenuWhereUniqueInput)
    connect?: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

    @Field(() => MenuUpdateToOneWithWhereWithoutFilesInput, {nullable:true})
    @Type(() => MenuUpdateToOneWithWhereWithoutFilesInput)
    update?: MenuUpdateToOneWithWhereWithoutFilesInput;
}
