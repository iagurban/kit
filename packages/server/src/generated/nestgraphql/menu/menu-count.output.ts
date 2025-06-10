import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class MenuCount {

    @Field(() => Int, {nullable:false})
    items?: number;

    @Field(() => Int, {nullable:false})
    tags?: number;

    @Field(() => Int, {nullable:false})
    files?: number;
}
