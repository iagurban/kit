import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemCreateOrConnectWithoutChildrenInput } from './item-create-or-connect-without-children.input';
import { ItemCreateWithoutChildrenInput } from './item-create-without-children.input';
import { ItemUpdateToOneWithWhereWithoutChildrenInput } from './item-update-to-one-with-where-without-children.input';
import { ItemUpsertWithoutChildrenInput } from './item-upsert-without-children.input';
import { ItemWhereInput } from './item-where.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemUpdateOneWithoutChildrenNestedInput {
  @Field(() => ItemCreateWithoutChildrenInput, { nullable: true })
  @Type(() => ItemCreateWithoutChildrenInput)
  create?: ItemCreateWithoutChildrenInput;

  @Field(() => ItemCreateOrConnectWithoutChildrenInput, { nullable: true })
  @Type(() => ItemCreateOrConnectWithoutChildrenInput)
  connectOrCreate?: ItemCreateOrConnectWithoutChildrenInput;

  @Field(() => ItemUpsertWithoutChildrenInput, { nullable: true })
  @Type(() => ItemUpsertWithoutChildrenInput)
  upsert?: ItemUpsertWithoutChildrenInput;

  @Field(() => ItemWhereInput, { nullable: true })
  @Type(() => ItemWhereInput)
  disconnect?: ItemWhereInput;

  @Field(() => ItemWhereInput, { nullable: true })
  @Type(() => ItemWhereInput)
  delete?: ItemWhereInput;

  @Field(() => ItemWhereUniqueInput, { nullable: true })
  @Type(() => ItemWhereUniqueInput)
  connect?: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

  @Field(() => ItemUpdateToOneWithWhereWithoutChildrenInput, { nullable: true })
  @Type(() => ItemUpdateToOneWithWhereWithoutChildrenInput)
  update?: ItemUpdateToOneWithWhereWithoutChildrenInput;
}
