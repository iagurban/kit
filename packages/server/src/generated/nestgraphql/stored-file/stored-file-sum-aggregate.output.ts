import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class StoredFileSumAggregate {

    @Field(() => Int, {nullable:true})
    size?: number;
}
