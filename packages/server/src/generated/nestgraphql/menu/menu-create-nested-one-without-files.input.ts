import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuCreateWithoutFilesInput } from './menu-create-without-files.input';
import { Type } from 'class-transformer';
import { MenuCreateOrConnectWithoutFilesInput } from './menu-create-or-connect-without-files.input';
import { Prisma } from '../../db-client';
import { MenuWhereUniqueInput } from './menu-where-unique.input';

@InputType()
export class MenuCreateNestedOneWithoutFilesInput {

    @Field(() => MenuCreateWithoutFilesInput, {nullable:true})
    @Type(() => MenuCreateWithoutFilesInput)
    create?: MenuCreateWithoutFilesInput;

    @Field(() => MenuCreateOrConnectWithoutFilesInput, {nullable:true})
    @Type(() => MenuCreateOrConnectWithoutFilesInput)
    connectOrCreate?: MenuCreateOrConnectWithoutFilesInput;

    @Field(() => MenuWhereUniqueInput, {nullable:true})
    @Type(() => MenuWhereUniqueInput)
    connect?: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;
}
