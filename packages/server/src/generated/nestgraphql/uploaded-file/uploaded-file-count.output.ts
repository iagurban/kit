import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UploadedFileCount {

    @Field(() => Int, {nullable:false})
    usingItems?: number;
}
