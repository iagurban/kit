import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MenuWhereInput } from './menu-where.input';

@InputType()
export class MenuScalarRelationFilter {

    @Field(() => MenuWhereInput, {nullable:true})
    is?: MenuWhereInput;

    @Field(() => MenuWhereInput, {nullable:true})
    isNot?: MenuWhereInput;
}
