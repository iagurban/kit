import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemCreateWithoutParentInput } from './item-create-without-parent.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemCreateOrConnectWithoutParentInput {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  @Type(() => ItemWhereUniqueInput)
  where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

  @Field(() => ItemCreateWithoutParentInput, { nullable: false })
  @Type(() => ItemCreateWithoutParentInput)
  create!: ItemCreateWithoutParentInput;
}
