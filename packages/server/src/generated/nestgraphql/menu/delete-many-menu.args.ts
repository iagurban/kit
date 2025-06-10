import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MenuWhereInput } from './menu-where.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteManyMenuArgs {

    @Field(() => MenuWhereInput, {nullable:true})
    @Type(() => MenuWhereInput)
    where?: MenuWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
