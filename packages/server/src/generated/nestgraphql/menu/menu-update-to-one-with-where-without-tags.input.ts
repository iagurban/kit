import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuWhereInput } from './menu-where.input';
import { Type } from 'class-transformer';
import { MenuUpdateWithoutTagsInput } from './menu-update-without-tags.input';

@InputType()
export class MenuUpdateToOneWithWhereWithoutTagsInput {

    @Field(() => MenuWhereInput, {nullable:true})
    @Type(() => MenuWhereInput)
    where?: MenuWhereInput;

    @Field(() => MenuUpdateWithoutTagsInput, {nullable:false})
    @Type(() => MenuUpdateWithoutTagsInput)
    data!: MenuUpdateWithoutTagsInput;
}
