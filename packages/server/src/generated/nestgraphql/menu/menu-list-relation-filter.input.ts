import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuWhereInput } from './menu-where.input';

@InputType()
export class MenuListRelationFilter {

    @Field(() => MenuWhereInput, {nullable:true})
    every?: MenuWhereInput;

    @Field(() => MenuWhereInput, {nullable:true})
    some?: MenuWhereInput;

    @Field(() => MenuWhereInput, {nullable:true})
    none?: MenuWhereInput;
}
