import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import {Prisma} from '../../db-client';
import Decimal = Prisma.Decimal;
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';
import { ItemUncheckedCreateNestedManyWithoutParentInput } from './item-unchecked-create-nested-many-without-parent.input';

@InputType()
export class ItemUncheckedCreateWithoutMenuInput {

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

    @Field(() => String, {nullable:true})
    imageId?: string;

    @Field(() => String, {nullable:true})
    parentId?: string;

    @Field(() => ItemUncheckedCreateNestedManyWithoutParentInput, {nullable:true})
    @Type(() => ItemUncheckedCreateNestedManyWithoutParentInput)
    children?: ItemUncheckedCreateNestedManyWithoutParentInput;
}
