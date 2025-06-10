import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class StoredFileAvgAggregate {

    @Field(() => Float, {nullable:true})
    size?: number;
}
