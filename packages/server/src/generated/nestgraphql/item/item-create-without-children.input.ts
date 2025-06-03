import { Field, InputType } from '@nestjs/graphql';

import { Prisma } from '../../db-client';
import Decimal = Prisma.Decimal;
import { Transform, Type } from 'class-transformer';
import { GraphQLDecimal, transformToDecimal } from 'prisma-graphql-type-decimal';

import { MenuCreateNestedOneWithoutItemsInput } from '../menu/menu-create-nested-one-without-items.input';
import { UploadedFileCreateNestedOneWithoutUsingItemsInput } from '../uploaded-file/uploaded-file-create-nested-one-without-using-items.input';
import { ItemCreateNestedOneWithoutChildrenInput } from './item-create-nested-one-without-children.input';

@InputType()
export class ItemCreateWithoutChildrenInput {
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

  @Field(() => UploadedFileCreateNestedOneWithoutUsingItemsInput, { nullable: true })
  @Type(() => UploadedFileCreateNestedOneWithoutUsingItemsInput)
  image?: UploadedFileCreateNestedOneWithoutUsingItemsInput;

  @Field(() => MenuCreateNestedOneWithoutItemsInput, { nullable: false })
  @Type(() => MenuCreateNestedOneWithoutItemsInput)
  menu!: MenuCreateNestedOneWithoutItemsInput;

  @Field(() => ItemCreateNestedOneWithoutChildrenInput, { nullable: true })
  @Type(() => ItemCreateNestedOneWithoutChildrenInput)
  parent?: ItemCreateNestedOneWithoutChildrenInput;
}
