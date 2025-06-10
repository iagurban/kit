import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ItemCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    createdAt!: number;

    @Field(() => Int, {nullable:false})
    orderKey!: number;

    @Field(() => Int, {nullable:false})
    title!: number;

    @Field(() => Int, {nullable:false})
    description!: number;

    @Field(() => Int, {nullable:false})
    price!: number;

    @Field(() => Int, {nullable:false})
    archived!: number;

    @Field(() => Int, {nullable:false})
    imageId!: number;

    @Field(() => Int, {nullable:false})
    menuId!: number;

    @Field(() => Int, {nullable:false})
    parentId!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
