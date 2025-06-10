import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuUpdateWithoutItemsInput } from './menu-update-without-items.input';
import { Type } from 'class-transformer';
import { MenuCreateWithoutItemsInput } from './menu-create-without-items.input';
import { MenuWhereInput } from './menu-where.input';

@InputType()
export class MenuUpsertWithoutItemsInput {

    @Field(() => MenuUpdateWithoutItemsInput, {nullable:false})
    @Type(() => MenuUpdateWithoutItemsInput)
    update!: MenuUpdateWithoutItemsInput;

    @Field(() => MenuCreateWithoutItemsInput, {nullable:false})
    @Type(() => MenuCreateWithoutItemsInput)
    create!: MenuCreateWithoutItemsInput;

    @Field(() => MenuWhereInput, {nullable:true})
    @Type(() => MenuWhereInput)
    where?: MenuWhereInput;
}
