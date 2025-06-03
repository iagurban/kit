import { Field, InputType } from '@nestjs/graphql';

import { Prisma } from '../../db-client';
import Decimal = Prisma.Decimal;
import { Transform, Type } from 'class-transformer';
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal';

import { ItemUncheckedCreateNestedManyWithoutParentInput } from './item-unchecked-create-nested-many-without-parent.input';

@InputType()
export class ItemUncheckedCreateWithoutParentInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string;

  @Field(() => String, { nullable: false })
  orderKey!: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => GraphQLDecimal, { nullable: true })
  @Type(() => Object)
  @Transform(transformToDecimal)
  price?: Decimal;

  @Field(() => Boolean, { nullable: true })
  archived?: boolean;

  @Field(() => String, { nullable: true })
  imageId?: string;

  @Field(() => String, { nullable: false })
  menuId!: string;

  @Field(() => ItemUncheckedCreateNestedManyWithoutParentInput, { nullable: true })
  @Type(() => ItemUncheckedCreateNestedManyWithoutParentInput)
  children?: ItemUncheckedCreateNestedManyWithoutParentInput;
}
