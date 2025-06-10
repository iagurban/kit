import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ItemWhereInput } from './item-where.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';

@ArgsType()
export class DeleteManyItemArgs {

    @Field(() => ItemWhereInput, {nullable:true})
    @Type(() => ItemWhereInput)
    where?: ItemWhereInput;

    @Field(() => Int, {nullable:true})
    limit?: number;
}
