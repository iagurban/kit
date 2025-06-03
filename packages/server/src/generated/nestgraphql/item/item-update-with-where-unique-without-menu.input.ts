import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import { Prisma } from '../../db-client';
import { ItemUpdateWithoutMenuInput } from './item-update-without-menu.input';
import { ItemWhereUniqueInput } from './item-where-unique.input';

@InputType()
export class ItemUpdateWithWhereUniqueWithoutMenuInput {
  @Field(() => ItemWhereUniqueInput, { nullable: false })
  @Type(() => ItemWhereUniqueInput)
  where!: Prisma.AtLeast<ItemWhereUniqueInput, 'id' | 'menuId_parentId_orderKey'>;

  @Field(() => ItemUpdateWithoutMenuInput, { nullable: false })
  @Type(() => ItemUpdateWithoutMenuInput)
  data!: ItemUpdateWithoutMenuInput;
}
