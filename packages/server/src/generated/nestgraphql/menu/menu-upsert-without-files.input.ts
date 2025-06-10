import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuUpdateWithoutFilesInput } from './menu-update-without-files.input';
import { Type } from 'class-transformer';
import { MenuCreateWithoutFilesInput } from './menu-create-without-files.input';
import { MenuWhereInput } from './menu-where.input';

@InputType()
export class MenuUpsertWithoutFilesInput {

    @Field(() => MenuUpdateWithoutFilesInput, {nullable:false})
    @Type(() => MenuUpdateWithoutFilesInput)
    update!: MenuUpdateWithoutFilesInput;

    @Field(() => MenuCreateWithoutFilesInput, {nullable:false})
    @Type(() => MenuCreateWithoutFilesInput)
    create!: MenuCreateWithoutFilesInput;

    @Field(() => MenuWhereInput, {nullable:true})
    @Type(() => MenuWhereInput)
    where?: MenuWhereInput;
}
