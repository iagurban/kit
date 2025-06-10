import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class StoredFileMaxAggregate {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:true})
    hash?: string;

    @Field(() => Int, {nullable:true})
    size?: number;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
}
