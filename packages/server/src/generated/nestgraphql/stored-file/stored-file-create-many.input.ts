import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class StoredFileCreateManyInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    hash!: string;

    @Field(() => Int, {nullable:false})
    size!: number;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;
}
