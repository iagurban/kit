import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class StoredFileCount {

    @Field(() => Int, {nullable:false})
    uploads?: number;
}
