import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemUpdateWithoutParentInput } from './item-update-without-parent.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemUpdateWithWhereUniqueWithoutParentInput {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  @Type(() => ItemWhereUniqueInput)
  where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

  @Field(() => ItemUpdateWithoutParentInput, { nullable: false })
  @Type(() => ItemUpdateWithoutParentInput)
  data!: ItemUpdateWithoutParentInput;
}
