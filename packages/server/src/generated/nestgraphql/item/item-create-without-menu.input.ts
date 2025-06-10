import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import {Prisma} from '../../db-client';
import Decimal = Prisma.Decimal;
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';
import { UploadedFileCreateNestedOneWithoutUsingItemsInput } from '../uploaded-file/uploaded-file-create-nested-one-without-using-items.input';
import { ItemCreateNestedOneWithoutChildrenInput } from './item-create-nested-one-without-children.input';
import { ItemCreateNestedManyWithoutParentInput } from './item-create-nested-many-without-parent.input';

@InputType()
export class ItemCreateWithoutMenuInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => String, {nullable:false})
    orderKey!: string;

    @Field(() => String, {nullable:true})
    title?: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => GraphQLDecimal, {nullable:true})
    @Type(() => Object)
    @Transform(transformToDecimal)
    price?: Decimal;

    @Field(() => Boolean, {nullable:true})
    archived?: boolean;

    @Field(() => UploadedFileCreateNestedOneWithoutUsingItemsInput, {nullable:true})
    @Type(() => UploadedFileCreateNestedOneWithoutUsingItemsInput)
    image?: UploadedFileCreateNestedOneWithoutUsingItemsInput;

    @Field(() => ItemCreateNestedOneWithoutChildrenInput, {nullable:true})
    @Type(() => ItemCreateNestedOneWithoutChildrenInput)
    parent?: ItemCreateNestedOneWithoutChildrenInput;

    @Field(() => ItemCreateNestedManyWithoutParentInput, {nullable:true})
    @Type(() => ItemCreateNestedManyWithoutParentInput)
    children?: ItemCreateNestedManyWithoutParentInput;
}
