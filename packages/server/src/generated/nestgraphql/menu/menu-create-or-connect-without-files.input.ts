import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '../../db-client';
import { MenuWhereUniqueInput } from './menu-where-unique.input';
import { Type } from 'class-transformer';
import { MenuCreateWithoutFilesInput } from './menu-create-without-files.input';

@InputType()
export class MenuCreateOrConnectWithoutFilesInput {

    @Field(() => MenuWhereUniqueInput, {nullable:false})
    @Type(() => MenuWhereUniqueInput)
    where!: Prisma.AtLeast<MenuWhereUniqueInput, 'id'>;

    @Field(() => MenuCreateWithoutFilesInput, {nullable:false})
    @Type(() => MenuCreateWithoutFilesInput)
    create!: MenuCreateWithoutFilesInput;
}
