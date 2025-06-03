import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemCreateWithoutParentInput } from './item-create-without-parent.input';
import { ItemUpdateWithoutParentInput } from './item-update-without-parent.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemUpsertWithWhereUniqueWithoutParentInput {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  @Type(() => ItemWhereUniqueInput)
  where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

  @Field(() => ItemUpdateWithoutParentInput, { nullable: false })
  @Type(() => ItemUpdateWithoutParentInput)
  update!: ItemUpdateWithoutParentInput;

  @Field(() => ItemCreateWithoutParentInput, { nullable: false })
  @Type(() => ItemCreateWithoutParentInput)
  create!: ItemCreateWithoutParentInput;
}
