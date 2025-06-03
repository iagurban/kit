import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemCreateWithoutChildrenInput } from './item-create-without-children.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemCreateOrConnectWithoutChildrenInput {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  @Type(() => ItemWhereUniqueInput)
  where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

  @Field(() => ItemCreateWithoutChildrenInput, { nullable: false })
  @Type(() => ItemCreateWithoutChildrenInput)
  create!: ItemCreateWithoutChildrenInput;
}
