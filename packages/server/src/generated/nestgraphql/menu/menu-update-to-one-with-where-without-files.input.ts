import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuWhereInput } from './menu-where.input';
import { Type } from 'class-transformer';
import { MenuUpdateWithoutFilesInput } from './menu-update-without-files.input';

@InputType()
export class MenuUpdateToOneWithWhereWithoutFilesInput {

    @Field(() => MenuWhereInput, {nullable:true})
    @Type(() => MenuWhereInput)
    where?: MenuWhereInput;

    @Field(() => MenuUpdateWithoutFilesInput, {nullable:false})
    @Type(() => MenuUpdateWithoutFilesInput)
    data!: MenuUpdateWithoutFilesInput;
}
