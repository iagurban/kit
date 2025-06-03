import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemCreateOrConnectWithoutChildrenInput } from './item-create-or-connect-without-children.input';
import { ItemCreateWithoutChildrenInput } from './item-create-without-children.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemCreateNestedOneWithoutChildrenInput {
  @Field(() => ItemCreateWithoutChildrenInput, { nullable: true })
  @Type(() => ItemCreateWithoutChildrenInput)
  create?: ItemCreateWithoutChildrenInput;

  @Field(() => ItemCreateOrConnectWithoutChildrenInput, { nullable: true })
  @Type(() => ItemCreateOrConnectWithoutChildrenInput)
  connectOrCreate?: ItemCreateOrConnectWithoutChildrenInput;

  @Field(() => ItemWhereUniqueInput, { nullable: true })
  @Type(() => ItemWhereUniqueInput)
  connect?: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;
}
