import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class UploadedFileCountAggregate {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => Int, {nullable:false})
    originalName!: number;

    @Field(() => Int, {nullable:false})
    mimetype!: number;

    @Field(() => Int, {nullable:false})
    uploadedAt!: number;

    @Field(() => Int, {nullable:false})
    uploaderId!: number;

    @Field(() => Int, {nullable:false})
    storedFileId!: number;

    @Field(() => Int, {nullable:false})
    menuId!: number;

    @Field(() => Int, {nullable:false})
    _all!: number;
}
