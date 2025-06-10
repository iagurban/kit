import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuCreateNestedOneWithoutTagsInput } from '../menu/menu-create-nested-one-without-tags.input';
import { Type } from 'class-transformer';

@InputType()
export class TagCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => MenuCreateNestedOneWithoutTagsInput, {nullable:false})
    @Type(() => MenuCreateNestedOneWithoutTagsInput)
    menu!: MenuCreateNestedOneWithoutTagsInput;
}
